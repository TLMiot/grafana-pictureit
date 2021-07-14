import React from 'react';
import { Input, ColorPicker, Switch, Field, HorizontalGroup, IconButton, UnitPicker, Button } from '@grafana/ui';
import Sensor from '../types/Sensor';

import produce from 'immer';
import { ColorDot } from 'components/ColorDot';

interface Props {
  sensor: Sensor;
  onChange: (sensor: Sensor, index: number) => void;
  onDelete: (index: number) => void;
  index: number;
}

export const EditorSensorItem: React.FC<Props> = (props: Props) => {
  const { sensor, index, onChange, onDelete } = props;

  function updateSensor(draftState: (draftMapping: Sensor) => void) {
    const updatedMapping = produce(sensor, draftState);

    onChange(updatedMapping, index);
  }

  return (
    <>
      <HorizontalGroup>
        Sensor {props.index + 1}
        <IconButton name="trash-alt" size="sm" surface="header" onClick={() => onDelete(index)} />
      </HorizontalGroup>

      {/* <HorizontalGroup> */}
      <Field label="Query ID" description="Set this as query ID OR the query alias below">
        <Input
          value={sensor.query.id}
          onChange={event => {
            updateSensor(sensor => {
              sensor.query.id = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Query Alias" description="If both alias and ID are set, ID has precedence">
        <Input
          value={sensor.query.alias}
          onChange={event => {
            updateSensor(sensor => {
              sensor.query.alias = event.currentTarget.value;
            });
          }}
        />
      </Field>
      {/* </HorizontalGroup> */}

      <Field
        label="Mapping ID"
        description="Paste here comma-separated IDs of the mappings you want to use for this sensor"
      >
        <Input
          value={sensor.mappingIds.join(', ')}
          onChange={event => {
            updateSensor(sensor => {
              const mappingIds = event.currentTarget.value
                .split(',')
                .map(mappingId => mappingId.trim())
                .filter(mappingId => mappingId !== '');
              sensor.mappingIds = mappingIds;
            });
          }}
        />
      </Field>

      <Field label="Name">
        <Input
          value={sensor.name}
          onChange={event => {
            updateSensor(sensor => {
              sensor.name = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Link">
        <Input
          value={sensor.link}
          onChange={event => {
            updateSensor(sensor => {
              sensor.link = event.currentTarget.value;
            });
          }}
        />
      </Field>

      <Field label="Show">
        <Switch
          value={sensor.visible}
          onChange={event => {
            updateSensor(sensor => {
              sensor.visible = event.currentTarget.checked;
            });
          }}
        />
      </Field>

      <Field label="Unit Type">
        <UnitPicker
          value={sensor.unit}
          onChange={unit => {
            updateSensor(sensor => {
              sensor.unit = unit;
            });
          }}
        />
      </Field>

      {/* <HorizontalGroup> */}
      <Field label="Font Color">
        <ColorPicker
          color={sensor.fontColor}
          onChange={color => {
            updateSensor(sensor => {
              sensor.fontColor = color;
            });
          }}
          enableNamedColors
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={sensor.fontColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>

      <Field label="Background Color">
        <ColorPicker
          color={sensor.backgroundColor}
          onChange={color => {
            updateSensor(sensor => {
              sensor.backgroundColor = color;
            });
          }}
          enableNamedColors
        >
          {({ ref, showColorPicker, hideColorPicker }) => (
            <Button ref={ref} onMouseLeave={hideColorPicker} onClick={showColorPicker} variant="secondary">
              Open color picker <ColorDot color={sensor.backgroundColor} />
            </Button>
          )}
        </ColorPicker>
      </Field>
      {/* </HorizontalGroup> */}

      <Field label="Decimals">
        <Input
          value={sensor.decimals}
          type="number"
          onChange={event => {
            updateSensor(sensor => {
              sensor.decimals = Number.parseInt(event.currentTarget.value, 10);
            });
          }}
        />
      </Field>
    </>
  );
};
