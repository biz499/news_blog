from django.db import models
from tinymce.models import HTMLField
from autoslug import AutoSlugField
from django.urls import reverse

# Create your models here.


class News_Post(models.Model):
    CATEGORY_CHOICES = [
        ('news', 'News'),
        ('sports', 'Sports'),
        ('business', 'Business'),
        ('entertainment', 'Entertainment'),
        ('travel', 'Travel'),
    ]
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    overview = models.TextField(max_length=400)
    meta_keywords = models.TextField(max_length=400)
    thumbnail_url = models.URLField(max_length=1024)
    description = HTMLField()
    new_blog_slug = AutoSlugField(populate_from='title',unique=True, null=True, default=None )
    selected_home_post = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add= True)
    views_count = models.IntegerField(default=0)  # Added field for views count
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)


    def save(self, *args, **kwargs):
        self.thumbnail_url = self.convert_to_direct_link(self.thumbnail_url)
        super(News_Post, self).save(*args, **kwargs)
        
    def get_absolute_url(self):
        return reverse('post',kwargs={
        'slug':self.new_blog_slug
        })
    
    def __str__(self):
        return self.title

    @staticmethod
    def convert_to_direct_link(url):
        if 'drive.google.com' in url:
            if '/file/d/' in url:
                file_id = url.split('/file/d/')[1].split('/')[0]
            else:
                file_id = url.split('/d/')[1].split('/')[0]
            direct_link = f'https://drive.google.com/uc?export=view&id={file_id}'
            return direct_link
        else:
            return url

  
    def increment_views(self):
        self.views_count += 1
        self.save()

   