from django.contrib import admin
from .models import Products


class Product_list(admin.ModelAdmin):
    list_display = ('product_id', 'name', 'category')
admin.site.register(Products, Product_list)