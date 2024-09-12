export default function SVGMarkers() {
  return (
    <svg>
      <defs>
        <marker
          id="green-arrow-start"
          markerWidth="10"
          markerHeight="7"
          refX="-10"
          refY="3.5"
          orient="auto"
          stroke="white"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="green" />
        </marker>
        <marker
          id="green-arrow-end"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
          stroke="white"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="green" />
        </marker>
        <marker
          id="red-arrow-start"
          markerWidth="10"
          markerHeight="7"
          refX="-10"
          refY="3.5"
          orient="auto"
          stroke="white"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="red" />
        </marker>
        <marker
          id="red-arrow-end"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
          stroke="white"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="red" />
        </marker>
      </defs>
    </svg>
  )
}
