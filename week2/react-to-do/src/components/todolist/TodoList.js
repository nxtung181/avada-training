import { useState, useEffect } from 'react';
import { Page, Modal, Card, ResourceList, ResourceItem, Text, Button, Badge, InlineStack, TextField } from '@shopify/polaris';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../../api/todoFetchApi';
import './TodoList.css';

export default function TodoList() {
  const [todos, setTodos] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await getTodos();
        setTodos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle.trim()) return;
    try {
      const res = await createTodo(newTitle);
      setTodos(prev => [res.data, ...prev]);
      setNewTitle('');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTodo = async (ids) => {
    try {
      const updatedTodos = await Promise.all(
        ids.map(async (id) => {
          const res = await updateTodo(id, { status: 'completed' })
          return res.data
        })
      )
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          ids.includes(todo.id)
            ? updatedTodos.find((u) => u.id === todo.id)
            : todo
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setSelectedItems([]);
    }
  };

  const handleIncompleteTodo = async (ids) => {
    try {
      const updatedTodos = await Promise.all(
        ids.map(async (id) => {
          const res = await updateTodo(id, { status: 'incomplete' })
          return res.data
        })
      )
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          ids.includes(todo.id)
            ? updatedTodos.find((u) => u.id === todo.id)
            : todo
        )
      );
    } catch (e) {
      console.error(e);
    } finally {
      setSelectedItems([]);
    }
  };

  const handleDeleteTodo = async (ids) => {
    try {
      await Promise.all(ids.map((id) => deleteTodo(id)));
      setTodos((prevTodos) => prevTodos.filter((todo) => !ids.includes(todo.id)));
    } catch (e) {
      console.log(e)
    } finally {
      setSelectedItems([]);
    }
  }

  return (
    <Page
      title="Todos"
      primaryAction={{ content: 'Create', onAction: () => setIsModalOpen(true), }}
    >
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create todo"
        primaryAction={{
          content: 'Add',
          onAction: handleAddTodo,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: () => setIsModalOpen(false),
          },
        ]}
      >
        <Modal.Section>
          <TextField
            label="Title"
            value={newTitle}
            onChange={setNewTitle}
            autoComplete="off"></TextField>
        </Modal.Section>
      </Modal>

      <Card >
        <ResourceList
          resourceName={{ singular: 'todo', plural: 'todos' }}
          items={todos}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          renderItem={(item) => {
            const { id, title, status } = item;
            return (
              <ResourceItem id={id}>
                <InlineStack align="space-between" blockAlign='center'>
                  <Text as="span" fontWeight="bold">
                    {title}
                  </Text>
                  <InlineStack gap="200">
                    <Badge tone={status === 'completed' ? 'success' : 'warning'}>
                      {status === 'completed' ? 'Complete' : 'Incomplete'}
                    </Badge>
                    <Button
                      size="slim"
                      variant="secondary"
                      onClick={() => handleCompleteTodo([id])}
                    >
                      Complete
                    </Button>
                    <Button
                      size="slim"
                      tone="critical"
                      onClick={() => handleDeleteTodo([id])}
                    >
                      Delete
                    </Button>
                  </InlineStack>
                </InlineStack>

              </ResourceItem>
            );
          }}
        />
      </Card>
      {selectedItems.length > 0 && (
        <div className='selected-actions'>
          <Button tone="success" onClick={() => handleCompleteTodo(selectedItems)}>
            Complete
          </Button>
          <Button onClick={() => handleIncompleteTodo(selectedItems)}>Incomplete</Button>
          <Button tone="critical" onClick={() => handleDeleteTodo(selectedItems)}>
            Delete
          </Button>
        </div>
      )}
    </Page>
  );
}
