import { migrationHandler, OldSensorType } from './migrationHandler';
import { SimpleOptions } from './types/SimpleOptions';
import { FieldConfigSource, PanelModel } from '@grafana/data';

describe('Migration handler', () => {
  describe('when migrating to a newer version', () => {
    it('should change mappingId correctly', () => {
      const mappingId = 'myMappingId';
      const panel: PanelModel<SimpleOptions> = {
        id: 1,
        fieldConfig: ({} as unknown) as FieldConfigSource,
        options: {
          forceImageRefresh: false,
          imageUrl: 'http://foo.bar/image.png',
          lockSensors: false,
          sensorsTextSize: 10,
          mappings: [],
          sensors: [
            {
              mappingId: mappingId,
            },
          ] as OldSensorType[],
        },
      };

      const result = migrationHandler(panel);

      // @ts-ignore
      expect(result.sensors[0].mappingId).toBeUndefined();
      expect(result.sensors[0].mappingIds).toStrictEqual([mappingId]);
    });
  });
});
