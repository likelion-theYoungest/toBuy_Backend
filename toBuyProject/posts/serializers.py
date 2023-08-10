from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import Products, Purchase
from rest_framework import serializers
from .models import Card

class ProductSerializer(ModelSerializer) :
    class Meta:
        model = Products
        fields = '__all__'

class PurchaseSerializer(ModelSerializer) :
    customer = ReadOnlyField(source='customer.id')
    
    class Meta:
        model = Purchase
        fields = '__all__'
        read_only_fields = ('image', 'name', 'price', 'category', 'total')
        
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__' 