import {ClusterMarker} from "./ClusterMarker";
import CustomMarker from "../MapMarker/CustomMarker";

export const markerWithCluster = (marker, index: number) => {
    const key = index + marker.geometry.coordinates[0];
    if (marker.properties) {
        return (
            <ClusterMarker
                key={key}
                coordinate={{
                    latitude: marker.geometry.coordinates[1],
                    longitude: marker.geometry.coordinates[0]
                }}
                count={marker.properties.point_count}
            />
        );
    }
    return <CustomMarker key={key} {...marker.event}/>
}