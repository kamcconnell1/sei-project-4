from django.urls import path
from .views import JobBoardView, JobDetailsView

urlpatterns = [
    path('', JobBoardView.as_view()),
    path('<int:pk>/', JobDetailsView.as_view())
]
