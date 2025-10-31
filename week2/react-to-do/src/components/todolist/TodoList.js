import { useState } from 'react';
import { Page, Card, ResourceList, ResourceItem, Text, Button, Badge, InlineStack } from '@shopify/polaris';
import { createTodo, updateTodo, deleteTodo, API_URL } from '../../api/todoFetchApi';
import './TodoList.css';
import useFetchData from '../../hooks/useFetchApi';
import Loading from '../loading/Loading';
import TodoAddModal from './TodoAddModal';

export default function TodoList() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { data: todos, setData: setTodos, loading } = useFetchData(`${API_URL}?limit=10`)

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
      <TodoAddModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        onAdd={handleAddTodo}
      />
      {loading ? (
        <Loading></Loading>
      ) : (
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
      )}
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
