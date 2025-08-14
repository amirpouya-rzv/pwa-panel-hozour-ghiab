import React, { useEffect, useRef } from "react";
import NeshanMapBase from "@neshan-maps-platform/react-openlayers";

function NeshanMap({ onPositionsChange, initialPositions }) {
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(null);

  // اضافه کردن پونز مربع
  const addSquareMarker = (lat, lon) => {
    if (!window.ol) return;
    const coordinate = window.ol.proj.fromLonLat([lon, lat]);
    const marker = new window.ol.Feature({
      geometry: new window.ol.geom.Point(coordinate),
    });

    marker.setStyle(
      new window.ol.style.Style({
        image: new window.ol.style.RegularShape({
          fill: new window.ol.style.Fill({ color: "#3B82F6" }), // رنگ آبی روشن
          stroke: new window.ol.style.Stroke({ color: "#1E40AF", width: 2 }), // حاشیه آبی تیره
          points: 4,
          radius: 10,
          angle: 0,
        }),
      })
    );

    vectorSourceRef.current.addFeature(marker);
  };

  // اضافه کردن مستطیل بین دو نقطه
  const addRectangleBetweenPoints = (lat1, lon1, lat2, lon2) => {
    if (!window.ol) return;

    const minLat = Math.min(lat1, lat2);
    const maxLat = Math.max(lat1, lat2);
    const minLon = Math.min(lon1, lon2);
    const maxLon = Math.max(lon1, lon2);

    // گوشه‌های مستطیل (بسته به طول و عرض جغرافیایی)
    const coordinates = [
      [minLon, minLat],
      [minLon, maxLat],
      [maxLon, maxLat],
      [maxLon, minLat],
      [minLon, minLat], // بستن مسیر
    ].map((coord) => window.ol.proj.fromLonLat(coord));

    const polygon = new window.ol.geom.Polygon([coordinates]);
    const feature = new window.ol.Feature(polygon);

    feature.setStyle(
      new window.ol.style.Style({
        stroke: new window.ol.style.Stroke({
          color: "rgba(29, 78, 216, 0.8)", // رنگ آبی با شفافیت
          width: 3,
        }),
        fill: new window.ol.style.Fill({
          color: "rgba(59, 130, 246, 0.3)", // رنگ زمینه آبی شفاف
        }),
      })
    );

    vectorSourceRef.current.addFeature(feature);
  };

  useEffect(() => {
    if (!window.ol || !mapRef.current?.map) return;

    const map = mapRef.current.map;

    // پاک کردن لایه‌های قبلی اگر بود
    if (vectorSourceRef.current) {
      vectorSourceRef.current.clear();
    }

    const vectorSource = new window.ol.source.Vector();
    vectorSourceRef.current = vectorSource;

    const vectorLayer = new window.ol.layer.Vector({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    let clickedPoints = [];

    const handleClick = (e) => {
      if (clickedPoints.length >= 2) return;

      const coordinate = e.coordinate;
      const [lon, lat] = window.ol.proj.toLonLat(coordinate);

      clickedPoints.push({ latitude: lat, longitude: lon });

      addSquareMarker(lat, lon);

      if (clickedPoints.length === 2) {
        addRectangleBetweenPoints(
          clickedPoints[0].latitude,
          clickedPoints[0].longitude,
          clickedPoints[1].latitude,
          clickedPoints[1].longitude
        );

        if (typeof onPositionsChange === "function") {
          onPositionsChange({
            lat1: clickedPoints[0].latitude,
            long1: clickedPoints[0].longitude,
            lat2: clickedPoints[1].latitude,
            long2: clickedPoints[1].longitude,
          });
        }
      }
    };

    map.on("click", handleClick);

    // بارگذاری نقاط اولیه و رسم روی نقشه
    if (
      initialPositions &&
      initialPositions.lat1 &&
      initialPositions.long1 &&
      initialPositions.lat2 &&
      initialPositions.long2
    ) {
      clickedPoints = [
        { latitude: initialPositions.lat1, longitude: initialPositions.long1 },
        { latitude: initialPositions.lat2, longitude: initialPositions.long2 },
      ];

      addSquareMarker(initialPositions.lat1, initialPositions.long1);
      addSquareMarker(initialPositions.lat2, initialPositions.long2);

      addRectangleBetweenPoints(
        initialPositions.lat1,
        initialPositions.long1,
        initialPositions.lat2,
        initialPositions.long2
      );
    }

    return () => {
      map.un("click", handleClick);
      if (vectorSourceRef.current) vectorSourceRef.current.clear();
    };
  }, [onPositionsChange, initialPositions]);

  return (
    <NeshanMapBase
      ref={mapRef}
      mapKey="web.ccf7c74a0fb746c1b3261beb8ca3edca"
      defaultType="standard-day"
      center={{ latitude: 35.6892, longitude: 51.389 }}
      zoom={13}
      poi={false}
      traffic={false}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default NeshanMap;
