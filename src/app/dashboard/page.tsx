
'use client'

import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialCategories = [
  { id: 1, name: "Electronics", description: "Gadgets and devices" },
  { id: 2, name: "Furniture", description: "Home and office furniture" },
  { id: 3, name: "Clothing", description: "Apparel and accessories" },
];

const AdminDashboard = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      setCategories([...categories, { id: Date.now(), ...newCategory }]);
      setNewCategory({ name: "", description: "" });
      setIsDialogOpen(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    if (editingCategory.name && editingCategory.description) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? editingCategory : cat
        )
      );
      setEditingCategory(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Admin Dashboard - Category Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Categories</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingCategory(null)}>
                  <PlusCircle className="mr-2" size={20} />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Input
                    placeholder="Category Name"
                    value={
                      editingCategory ? editingCategory.name : newCategory.name
                    }
                    onChange={(e) =>
                      editingCategory
                        ? setEditingCategory({
                            ...editingCategory,
                            name: e.target.value,
                          })
                        : setNewCategory({
                            ...newCategory,
                            name: e.target.value,
                          })
                    }
                  />
                  <Input
                    placeholder="Category Description"
                    value={
                      editingCategory
                        ? editingCategory.description
                        : newCategory.description
                    }
                    onChange={(e) =>
                      editingCategory
                        ? setEditingCategory({
                            ...editingCategory,
                            description: e.target.value,
                          })
                        : setNewCategory({
                            ...newCategory,
                            description: e.target.value,
                          })
                    }
                  />
                  <Button
                    onClick={
                      editingCategory ? handleUpdateCategory : handleAddCategory
                    }
                  >
                    {editingCategory ? "Update Category" : "Add Category"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleEditCategory(category)}
                    >
                      <Pencil size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
