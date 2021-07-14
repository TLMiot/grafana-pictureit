import { PanelModel } from '@grafana/data';
import { SimpleOptions } from './types/SimpleOptions';
import Sensor from './types/Sensor';

export type OldSensorType = Sensor & {
  mappingId?: string;
};

export const migrationHandler = (panel: PanelModel<SimpleOptions>) => {
  // const previousVersion = parseFloat(panel.pluginVersion || '1.0.0');
  let options = panel.options;

  const sensors = (options.sensors || []) as OldSensorType[];

  if (sensors) {
    sensors.map(sensor => {
      if (sensor.mappingId) {
        sensor.mappingIds = [sensor.mappingId];
        delete sensor.mappingId;
      } else {
        sensor.mappingIds = [];
      }
    });
  }

  return options;
};
