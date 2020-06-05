from django.urls import path
from .views import JobStatusListView, JobStatusDetailsView

urlpatterns = [
    path('', JobStatusListView.as_view()),
    path('<int:pk>/', JobStatusDetailsView.as_view())
]