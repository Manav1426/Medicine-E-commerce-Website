from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import json

from .models import CustomUser, Product, Order, OrderItem

CustomUser = get_user_model()

# -------------------------------
# REGISTER USER
# -------------------------------
@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        full_name = data.get('name')
        email = data.get('email')
        mobile = data.get('mobile')
        address = data.get('address')
        password = data.get('password')

        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists'}, status=400)

        try:
            user = CustomUser.objects.create_user(
                username=full_name,
                email=email,
                mobile=mobile,
                address=address,
                password=password,
            )
            return JsonResponse({'message': 'User registered successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

# -------------------------------
# LOGIN USER
# -------------------------------
@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')

            # Authenticate using email as username
            user = authenticate(request, username=email, password=password)

            if user is not None:
                return JsonResponse({
                    'id': user.id,
                    'email': user.email,
                    'name': user.username,
                    'role': user.title,
                })
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

# -------------------------------
# LIST PRODUCTS
# -------------------------------
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        data = []
        for product in products:
            data.append({
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': float(product.price),
                'category': product.category,
            })
        return JsonResponse({'products': data}, safe=False)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@csrf_exempt
@login_required
def place_order(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            customer = request.user  # 🟢 Automatically get the logged-in user

            items = data.get('items', [])
            if not items:
                return JsonResponse({'error': 'No items provided'}, status=400)

            address = data.get('address', {})
            full_name = address.get('full_name', '')
            address_line = address.get('address', '')
            city = address.get('city', '')
            state = address.get('state', '')
            zip_code = address.get('zip_code', '')
            country = address.get('country', '')
            payment_method = data.get('payment_method', '')
            requires_prescription = data.get('requires_prescription', False)

            order = Order.objects.create(
                customer=customer,
                full_name=full_name,
                address=address_line,
                city=city,
                state=state,
                zip_code=zip_code,
                country=country,
                payment_method=payment_method,
                requires_prescription=requires_prescription,
                status='confirmed',
                created_at=timezone.now()
            )

            total_amount = 0
            for item in items:
                product_id = item.get('product_id')
                quantity = item.get('quantity', 1)

                try:
                    product = Product.objects.get(id=product_id)
                except Product.DoesNotExist:
                    return JsonResponse({'error': f'Product ID {product_id} not found'}, status=404)

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity
                )
                total_amount += product.price * quantity

            order.total_amount = total_amount
            order.save()

            return JsonResponse({
                'message': 'Order placed successfully',
                'order_id': order.id,
                'status': order.status,
                'total': float(order.total_amount),
                'items': [
                    {'product': item.product.name, 'quantity': item.quantity}
                    for item in order.items.all()
                ]
            }, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# -------------------------------
# VIEW ORDER HISTORY
# -------------------------------
def order_list(request, user_id):
    if request.method == 'GET':
        try:
            orders = Order.objects.filter(customer__id=user_id).order_by('-created_at')
            data = []

            for order in orders:
                items = order.items.all()
                item_list = []
                for item in items:
                    item_list.append({
                        'product_id': item.product.id,
                        'product_name': item.product.name,
                        'quantity': item.quantity,
                        'price': float(item.product.price)
                    })

                data.append({
                    'order_id': order.id,
                    'created_at': order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                    'items': item_list
                })

            return JsonResponse({'orders': data})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
