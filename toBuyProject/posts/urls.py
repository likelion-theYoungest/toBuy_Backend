from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CardViewSet, PurchaseViewSet, MainProductListView, UserProfileCardPurchasesView

product_router = SimpleRouter(trailing_slash=False)
product_router.register('products', ProductViewSet, basename='products')
card_router = DefaultRouter()
card_router.register(r'cards', CardViewSet)  
purchase_router = DefaultRouter()
purchase_router.register(r'purchase', PurchaseViewSet)  
router = DefaultRouter()
router.register(r'cards', CardViewSet, basename='card')

urlpatterns = [
    path('', include(product_router.urls)),
    path('', include(card_router.urls)),
    path('', include(purchase_router.urls)),
    path('products/main/', MainProductListView.as_view(), name='main_product_list'),
    path('products/recentsearch/', ProductViewSet.as_view({'get': 'recent_searches_list'}), name='recent_search_list'),
    path('products/<str:category>/', ProductViewSet.as_view({'get': 'list_by_category'}), name='product_list_by_category'),
    path('products/<str:category>/<str:product_id>/', ProductViewSet.as_view({'get': 'product_detail'}), name='product_detail'),
    path('mypage/', UserProfileCardPurchasesView.as_view(), name='mypage'),
    # path('purchase/<int:pk>/get_specific_purchase/', PurchaseViewSet.as_view({'get': 'get_specific_purchase'}), name='get_specific_purchase'),
]+ router.urls
