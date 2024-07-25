from django.test import TestCase
from .models import Component, Vehicle, Issue, Transaction
from datetime import date

class ComponentModelTest(TestCase):
    def test_string_representation(self):
        component = Component(name="Brake Pad", repair_price=50.00, purchase_price=40.00)
        self.assertEqual(str(component), component.name)

class IssueModelTest(TestCase):
    def setUp(self):
        self.component1 = Component.objects.create(name="Brake Pad", repair_price=50.00, purchase_price=40.00)
        self.component2 = Component.objects.create(name="Oil Filter", repair_price=20.00, purchase_price=15.00)
        self.vehicle = Vehicle.objects.create(plate_number="XYZ 123", model="Toyota Camry")
        self.issue = Issue.objects.create(vehicle=self.vehicle, description="Brake issue")
        self.issue.components.set([self.component1, self.component2])

    def test_calculate_final_price(self):
        self.assertEqual(self.issue.calculate_final_price(), 70.00)

class TransactionModelTest(TestCase):
    def setUp(self):
        self.component1 = Component.objects.create(name="Brake Pad", repair_price=50.00, purchase_price=40.00)
        self.vehicle = Vehicle.objects.create(plate_number="XYZ 123", model="Toyota Camry")
        self.issue = Issue.objects.create(vehicle=self.vehicle, description="Brake issue")
        self.transaction = Transaction.objects.create(issue=self.issue, amount=70.00, date=date.today())

    def test_string_representation(self):
        self.assertEqual(str(self.transaction), f"Transaction for {self.issue} on {self.transaction.date}")
