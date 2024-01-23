from django.shortcuts import render
from .models import News_Post
from django.http import HttpResponseRedirect

# Create your views here.

from django.contrib import messages
from django.db.models import Count,Q
from django.shortcuts import get_object_or_404


def get_category_count():
    category_count = {}
    for category, count in News_Post.objects.values('category').annotate(Count('category')):
        category_count[category] = count
    return category_count


def search(request):
  category_count = get_category_count()
  category_list = list(category_count.keys())
  posts = News_Post.objects.all().order_by('-timestamp')
  query = request.GET.get('q')
  business_list = News_Post.objects.filter (category='business').order_by ('-timestamp')

  if query:
    posts = posts.filter(
      Q(title__icontains = query) |
      Q(overview__icontains = query) |       
      Q(meta_keywords__icontains = query) |     
      Q(author__icontains = query)|        
      Q(new_blog_slug__icontains = query)     
    ).distinct() [0:6]

  context = {   
        'category_count' : category_count,
        'category_list' : category_list,
        'posts':posts,
        'business_list' : business_list,

  }


  return render(request,'search_result.html',context)


def index(request):
  # project = Blog_Post.objects.filter (project = True)
  # project_latest = Blog_Post.objects.filter (project = True).order_by ('-timestamp')[0:3]
  featured_home_list = News_Post.objects.filter (selected_home_post = True).order_by ('-timestamp') [0:6]
  recent = News_Post.objects.order_by ('-timestamp') [0:4]
  popular = News_Post.objects.order_by ('-views_count') [0:4]
  news_list = News_Post.objects.filter (category='news').order_by ('-timestamp')
  sports_list = News_Post.objects.filter (category='sports').order_by ('-timestamp') 
  business_list = News_Post.objects.filter (category='business').order_by ('-timestamp')
  entertainment_list = News_Post.objects.filter (category='entertainment').order_by ('-timestamp')
  travel_list = News_Post.objects.filter (category='travel').order_by ('-timestamp')
  

  # latest_only_blog = Blog_Post.objects.exclude (project = True).order_by ('-timestamp')[0:3]
  if request.method == 'POST' :

      email = request.POST['email']
      message = request.POST['message']
      enquiry = enquiry()
      enquiry.email = email
      enquiry.message = message
      enquiry.save()
      messages.success(request,"Thankyou for reaching us out! Our team shall contact you soon! ")
      return HttpResponseRedirect('/home')

  context = {
    'featured_home_list':featured_home_list,
    'recent' : recent,
    # 'project_list' : project,
    'popular' : popular,
    'news_list': news_list,
    'sports_list' : sports_list,
    'business_list' : business_list,
    'entertainment_list' : entertainment_list,
    'travel_list' : travel_list,

    # 'latest_blog' : latest_only_blog,
  }

  return render(request,'index.html',context)



def post(request,slug):
  business_list = News_Post.objects.filter (category='business').order_by ('-timestamp')
  post = get_object_or_404(News_Post,new_blog_slug=slug)
  post.increment_views()
  recent = News_Post.objects.order_by ('-timestamp') [0:4]

  context= {
    'post':post,
    'recent':recent,
    'business_list' : business_list,
  }
  return render(request,'standard-post.html',context)


def post_list(request,category):
  business_list = News_Post.objects.filter (category='business').order_by ('-timestamp')
  posts = News_Post.objects.filter(category=category)
  recent = News_Post.objects.order_by ('-timestamp') [0:4]

  context= {
    'posts':posts,
    'category': category,
    'business_list' : business_list,
    'recent': recent
  }
  return render(request,'blog-list.html',context)

def contact(request):
  business_list = News_Post.objects.filter (category='business').order_by ('-timestamp')
  context= {

    'business_list' : business_list,
  }
  return render(request,'contact-us.html',context)