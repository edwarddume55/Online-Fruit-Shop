from django.shortcuts import render,redirect
from django.contrib import messages
from django.http.response import JsonResponse

from django.contrib.auth.decorators import login_required
from store.models import Wishlist, Product

@login_required(login_url='loginpage')
def index(request):
    wishitems= Wishlist.objects.filter(user=request.user)
    context= {'wishitems': wishitems}
    return render(request, 'store/wishlist.html', context)

def addtowishlist(request):
    if request.method== 'POST':
        if request.user.is_authenticated:
            prod_id = int(request.POST.get("product_id"))
            product_check = Product.objects.get(id=prod_id)
            if(product_check):
                if(Wishlist.objects.filter(user=request.user, product_id=prod_id)):
                    return JsonResponse({'status': "Product already in this wishlist"})
                else:
                    Wishlist.objects.create(user=request.user, product_id=prod_id)
                    return JsonResponse({'status': "Product added to wishlist"})
            else:
                return JsonResponse({'status': "No such Product found"})
        else:
            return JsonResponse({'status': "Login to continue"})
        

    return redirect('/')

def deletewishlistitem(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
             prod_id = int(request.POST.get("product_id"))
             if(Wishlist.objects.filter(user=request.user, product_id=prod_id)):
                wishlistitem=Wishlist.objects.get(product_id=prod_id)
                wishlistitem.delete()
                return JsonResponse({'status': "Product  removed from wishlist"}) # for development
             else:
                return JsonResponse({'status': "Product not found in the wishlist"})
        else:
            return JsonResponse({'status': "Login to continue"})
        

    return redirect('/')