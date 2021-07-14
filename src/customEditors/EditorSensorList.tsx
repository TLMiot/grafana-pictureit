import React from 'react';
import { css } from 'emotion';
import { stylesFactory, useTheme } from '@grafana/ui';
import { Button } from '@grafana/ui';
import { EditorSensorItem } from './EditorSensorItem';
import Sensor from '../types/Sensor';
import { GrafanaTheme } from '@grafana/data';

interface Props {
  sensors: Sensor[];

  onChange: (sensors: Sensor[]) => void;
}

const defaultNewSensor: Sensor = {
  name: 'Name',
  query: {
    id: 'A',
    alias: '',
  },
  visible: true,
  backgroundColor: '#000',
  fontColor: '#FFF',
  bold: false,
  link: '',
  position: {
    x: 50,
    y: 50,
  },
  mappingIds: [],
  unit: undefined,
  decimals: 2,
  valueBlink: false,
  backgroundBlink: false,
};

export const EditorSensorList: React.FC<Props> = (props: Props) => {
  const { sensors, onChange } = props;

  const theme = useTheme();
  const styles = getStyles(theme);

  const onSensorChange = (sensor: Sensor, index: number) => {
    sensors[index] = sensor;

    onChange(sensors);
  };

  const onSensorDelete = (index: number) => {
    sensors.splice(index, 1);

    onChange(sensors);
  };

  const addNewSensor = () => {
    sensors.push(defaultNewSensor);

    onChange(sensors);
  };

  return (
    <>
      {/* list of existing sensors */}
      {sensors &&
        sensors.map((sensor: Sensor, index: number) => {
          return (
            <div className={styles.sensorItemWrapperStyle}>
              <EditorSensorItem
                key={index}
                sensor={sensor}
                onChange={onSensorChange}
                onDelete={onSensorDelete}
                index={index}
              />
            </div>
          );
        })}

      <Button className={styles.addButtonStyle} onClick={addNewSensor} variant="secondary" size="md">
        Add New
      </Button>
    </>
  );
};

const getStyles = stylesFactory((theme: GrafanaTheme) => ({
  sensorItemWrapperStyle: css`
    margin-bottom: 16px;
    padding: 8px;
    background-color: ${theme.colors.bg2};
  `,

  addButtonStyle: css`
    /* margin-left: 8px; */
  `,
}));
