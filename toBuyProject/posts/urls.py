from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ProductViewSet

product_router = SimpleRouter(trailing_slash=False)
product_router.register('products', ProductViewSet, basename='products')

urlpatterns = [
    path('', include(product_router.urls)),
    path('products/<str:category>/', ProductViewSet.as_view({'get': 'list_by_category'}), name='product_list_by_category'),
    path('products/<str:category>/<str:product_id>/', ProductViewSet.as_view({'get': 'product_detail'}), name='product_detail'),
]
