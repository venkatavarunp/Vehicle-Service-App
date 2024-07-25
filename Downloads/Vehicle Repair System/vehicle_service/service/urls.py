from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ComponentViewSet, VehicleViewSet, IssueViewSet, TransactionViewSet, calculate_final_price, revenue_report

router = DefaultRouter()
router.register(r'components', ComponentViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'issues', IssueViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('issues/<int:issue_id>/final_price/', calculate_final_price),
    path('revenue/<str:period>/', revenue_report),
]
