"use client";

import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface BudgetItem {
  id: string;
  project: string;
  task: string;
  limit: number;
  allocated: number;
  spent: number;
}

const TaskIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <BudgetSection />;
};

export default TaskIdPage;

function BudgetSection() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [form, setForm] = useState({
    project: "",
    task: "",
    limit: "",
    allocated: "",
    spent: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const newBudget: BudgetItem = {
      id: crypto.randomUUID(),
      project: form.project,
      task: form.task,
      limit: parseFloat(form.limit),
      allocated: parseFloat(form.allocated),
      spent: parseFloat(form.spent),
    };
    setBudgets([...budgets, newBudget]);
    setForm({ project: "", task: "", limit: "", allocated: "", spent: "" });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Budget Tracker</CardTitle>
          <p className="text-sm text-muted-foreground">
            Define and track budgets for your projects and tasks.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="project">Project</Label>
              <Input
                id="project"
                name="project"
                value={form.project}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                name="task"
                value={form.task}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="limit">Financial Limit (₹)</Label>
              <Input
                id="limit"
                name="limit"
                type="number"
                value={form.limit}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="allocated">Allocated Funds (₹)</Label>
              <Input
                id="allocated"
                name="allocated"
                type="number"
                value={form.allocated}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="spent">Spent Amount (₹)</Label>
              <Input
                id="spent"
                name="spent"
                type="number"
                value={form.spent}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button onClick={handleAdd}>Add Budget</Button>
        </CardContent>
      </Card>

      <Separator />

      {budgets.length > 0 && (
        <div className="space-y-4">
          {budgets.map((b) => (
            <Card key={b.id}>
              <CardHeader>
                <CardTitle>
                  {b.project} — {b.task}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>Limit:</strong> ₹{b.limit}
                </div>
                <div>
                  <strong>Allocated:</strong> ₹{b.allocated}
                </div>
                <div>
                  <strong>Spent:</strong> ₹{b.spent}
                </div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      b.spent > b.limit ? "text-red-500" : "text-green-600"
                    }
                  >
                    {b.spent > b.limit ? "Over Budget" : "On Track"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
