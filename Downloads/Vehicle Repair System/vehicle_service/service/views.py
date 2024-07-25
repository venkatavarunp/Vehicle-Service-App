from rest_framework import viewsets
from .models import Component, Vehicle, Issue, Transaction
from .serializers import ComponentSerializer, VehicleSerializer, IssueSerializer, TransactionSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum
from datetime import datetime, timedelta

class ComponentViewSet(viewsets.ModelViewSet):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

@api_view(['GET'])
def calculate_final_price(request, issue_id):
    try:
        issue = Issue.objects.get(id=issue_id)
    except Issue.DoesNotExist:
        return Response({"error": "Issue not found"}, status=status.HTTP_404_NOT_FOUND)
    
    final_price = issue.calculate_final_price()
    return Response({"final_price": final_price})

@api_view(['GET'])
def revenue_report(request, period):
    today = datetime.today()
    
    if period == 'daily':
        start_date = today.date()
        end_date = start_date
    elif period == 'monthly':
        start_date = today.replace(day=1)
        end_date = (start_date.replace(month=start_date.month + 1) - timedelta(days=1)).date()
    elif period == 'yearly':
        start_date = today.replace(month=1, day=1)
        end_date = today.replace(month=12, day=31)
    else:
        return Response({"error": "Invalid period"}, status=status.HTTP_400_BAD_REQUEST)

    transactions = Transaction.objects.filter(date__range=[start_date, end_date])
    total_revenue = transactions.aggregate(Sum('amount'))['amount__sum'] or 0
    
    return Response({
        "start_date": start_date,
        "end_date": end_date,
        "total_revenue": total_revenue
    })
