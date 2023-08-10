from django.contrib import admin
from .models import Products, Purchase, Card


class Product_list(admin.ModelAdmin):
    list_display = ('product_id', 'name', 'category')
admin.site.register(Products, Product_list)

class Purchase_list(admin.ModelAdmin):
    list_display = ('id', 'name', 'customer', 'product')
admin.site.register(Purchase, Product_list)

class Card_list(admin.ModelAdmin):
    list_display = ('id', 'num', 'customer')
admin.site.register(Card, Card_list)