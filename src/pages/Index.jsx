import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2023-10-01", amount: 200, type: "expense", category: "Nike" },
    { id: 2, date: "2023-10-05", amount: 150, type: "income", category: "Adidas" },
  ]);
  const [form, setForm] = useState({ date: "", amount: "", type: "", category: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (editId) {
      setTransactions(transactions.map((t) => (t.id === editId ? { ...form, id: editId } : t)));
      setEditId(null);
    } else {
      setTransactions([...transactions, { ...form, id: transactions.length + 1 }]);
    }
    setForm({ date: "", amount: "", type: "", category: "" });
  };

  const handleEdit = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setForm(transaction);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Sneaker Transactions</Text>
        <HStack spacing={4} width="100%">
          <Input placeholder="Date" name="date" value={form.date} onChange={handleChange} />
          <Input placeholder="Amount" name="amount" value={form.amount} onChange={handleChange} />
          <Select placeholder="Type" name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
          <Select placeholder="Category" name="category" value={form.category} onChange={handleChange}>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
          </Select>
          <Button onClick={handleSubmit}>{editId ? "Update" : "Add"}</Button>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Category</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.date}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.type}</Td>
                <Td>{transaction.category}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEdit(transaction.id)} />
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDelete(transaction.id)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;