from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.product_list, name='product-list'),
    path('order/place/', views.place_order, name='place-order'),
    path('orders/', views.order_list, name='order-list'),  # Removed <int:user_id>
    path('register/', views.register_user, name='register'),
    path('login/', views.login_user, name='login'),
]
