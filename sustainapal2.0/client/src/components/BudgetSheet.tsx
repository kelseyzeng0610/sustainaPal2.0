import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setBudget } from "@/api/energy";
import { useToast } from "@/hooks/useToast";
import { PiggyBank } from "lucide-react";

interface BudgetSheetProps {
  currentBudget: number;
  onBudgetSet: (budget: number) => void;
}

export function BudgetSheet({ currentBudget, onBudgetSet }: BudgetSheetProps) {
  const [budget, setBudgetValue] = useState(currentBudget);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await setBudget({ budget });
      if (response.success) {
        toast({
          title: "Success",
          description: "Budget set successfully",
        });
        onBudgetSet(budget);
        setIsOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to set budget",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="ios-button-primary">
          <PiggyBank className="h-4 w-4 mr-2" />
          Set Your Monthly Budget
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Set Monthly Budget</SheetTitle>
          <SheetDescription>
            Set your monthly energy budget to help track your spending
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudgetValue(Number(e.target.value))}
                className="ios-input text-2xl font-bold"
                placeholder="Enter your budget"
              />
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full ios-button-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Setting..." : "Set Budget"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}