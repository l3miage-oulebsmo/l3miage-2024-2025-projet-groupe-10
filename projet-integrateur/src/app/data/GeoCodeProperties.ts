import { FeatureCollection, Geometry, Point } from 'geojson';
import * as zod from 'zod';
export interface GeoCodeProperties {
    readonly label: string;
    readonly score: number;
    readonly housenumber?: string;
    readonly id: string;
    readonly type: string;
    readonly name: string;
    readonly postcode: string;
    readonly citycode: string;
    readonly x: number;
    readonly y: number;
    readonly city: string;
    readonly context: string;
    readonly importance: number;
    readonly street?: string;
}

export const GeoCodePropertiesSchema = zod.object({
    label: zod.string(),
    score: zod.number(),
    housenumber: zod.string().optional(),
    id: zod.string(),
    type: zod.string(),
    name: zod.string(),
    postcode: zod.string(),
    citycode: zod.string(),
    x: zod.number(),
    y: zod.number(),
    city: zod.string(),
    context: zod.string(),
    importance: zod.number(),
    street: zod.string().optional()
}).readonly();

export function getParserJSONFeatureCollection<G extends Geometry, T>(
    geometrySchema: zod.ZodType<G>,
    propertiesSchema: zod.ZodType<T>
): (obj: unknown) => Promise<FeatureCollection<G, T>> {
    return async (obj: unknown): Promise<FeatureCollection<G, T>> => {
        try {
            
            const featureSchema = zod.object({
                type: zod.literal("Feature"),
                geometry: geometrySchema,
                properties: propertiesSchema,
            });

            const featureCollectionSchema = zod.object({
                type: zod.literal("FeatureCollection"),
                features: zod.array(featureSchema),
            });

            const parsed = featureCollectionSchema.parse(obj) as FeatureCollection<G, T>;

            return parsed;
        } catch (error) {
            if (error instanceof zod.ZodError) {
                throw new Error("Invalid JSON structure: " + error.message);
            }
            throw error;
        }
    };
}