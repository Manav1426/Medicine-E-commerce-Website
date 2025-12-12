from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Product, Order, OrderItem

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'mobile', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('mobile', 'address')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('mobile', 'address')}),
    )

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
