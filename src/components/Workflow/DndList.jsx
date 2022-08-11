import React from 'react';
import {
  createStyles, Text, UnstyledButton
} from '@mantine/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { IconTrash } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm
  },

  itemDragging: {
    boxShadow: theme.shadows.sm
  }
}));

export function DndList({ state, handlers }) {
  const { classes, cx } = useStyles();
  const deleteState = (index) => {
    handlers.remove(index);
  };

  const items = state.map((item, index) => (
    <Draggable key={item.status} index={index} draggableId={item.status}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <Text>{item.status}</Text>
            <Text color="dimmed" size="sm">
              Will be processed by
              {' '}
              {item.designation}
            </Text>
          </div>
          <UnstyledButton onClick={() => deleteState(index)}>
            <IconTrash color="red" />
          </UnstyledButton>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => handlers.reorder(
        { from: source.index, to: destination.index || 0 }
      )}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

DndList.propTypes = {
  state: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      designation: PropTypes.string.isRequired
    })
  ).isRequired,

  handlers: PropTypes.objectOf(PropTypes.func).isRequired
};
