from django.shortcuts import render,redirect
from django.contrib import messages

from store.forms import CustomUserForm

# Create your views here.

def register(request):
    form = CustomUserForm()
    context = {'form': form}
    return render(request,'store/auth/register.html',context )