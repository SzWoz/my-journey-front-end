import React from 'react'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from './WaypointsList.module.scss'
import MenuIcon from '@assets/icons/menu.svg'

interface WaypointsListProps {
  locations: { formattedAddress: string; lat: number; lng: number }[]
  setLocations: (locations: any) => void
}

function SortableItem({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  }
  const classNames = `${styles.SortableItem} ${isDragging ? styles.isDragging : ''}`

  return (
    <div ref={setNodeRef} style={style} className={classNames} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

function WaypointsList({ locations, setLocations }: WaypointsListProps) {
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setLocations(
        arrayMove(
          locations,
          locations.findIndex(item => item.formattedAddress === active.id),
          locations.findIndex(item => item.formattedAddress === over.id)
        )
      )
    }
  }

  return (
    <div className={styles.DragZone}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={locations.map(({ formattedAddress }) => formattedAddress)}
          strategy={verticalListSortingStrategy}
        >
          {locations.map((location, index) => (
            <SortableItem key={location.formattedAddress} id={location.formattedAddress}>
              <div>
                {location.formattedAddress}
                <MenuIcon />
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default WaypointsList
