// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js


// this is a different line

// turn off console logging in production
const { hostname='' } = location;
if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
  console.log = console.info = console.debug = console.error = function () {};
}

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faUserMd } from '@fortawesome/free-solid-svg-icons/faUserMd';
library.add(faExclamationTriangle, faBuilding, faUserMd);

// import pinboard
import pinboard from '@phila/pinboard/src/main.js';

// import data-sources
import datapoints from './data-sources/datapoints';

// import custom css
import customCss from './custom-css.css';

// import custom components
import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';
const customComps = {
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
};

pinboard({
  header: {
    logo: false,
    beta: true,
    button: {
      enabled: true,
      href: 'https://airtable.com/shrQ8Xqx9flpQA09h',
      text: 'Submit a Site',
    },
  },
  alerts: {
    modal: {
      enabled: false,
      header: '',
      body: '',
    },
    // header: {
    //   type: 'alertBanner',
    //   // enabled: function(state) {
    //   //   return state.alertResponse === 'alertHours';
    //   // },
    //   // content: '<b>Until further notice:</b> Please call ahead or check hours of operation while business restrictions are still in effect.',
    // },
    alertChecks: [
      // {
      //   type: 'alertHours',
      //   condition: [
      //     {
      //       'day': 1,
      //       'startTime': '1:00',
      //       'endTime': '23:59',
      //     },
      //     {
      //       'day': 2,
      //       'startTime': '1:00',
      //       'endTime': '23:59',
      //     },
      //   ],
      // },
    ],
  },
  app: {
    type: 'datapoints',
    title: 'Sites of Racism and Resistance',
    subtitle: 'A crowdsourced map to fight racism in Philly',
    logoAlt: 'TAL',
  },
  comboSearch: {
    dropdown: [ 'keyword' ],
    placeholderText: 'Filter by keyword'
  },
  locationInfo: {
    siteName: function(item) {
      return item.site_name;
    },
  },
  customComps,
  markerType: 'circle-marker',
  circleMarkers:{
    circleColors: {
      'Racist': '#fc603d',
      'Anti-Racist': '#145bff'
    },
    // selectedColor: 'green',
    weight: 0,
    // radius: 8,
    // mobileRadius: 12,
    size: 16,
    mobileSize: 20,
  },
  legendControls: {
    legend: {
      options: {
        showWithBaseMapOnly: true,
        shape: 'circle',
      },
      data: {
        // TODO give these an id instead of using the label as a key
        'Racist': {
          'border-color': 'black',
          'border-style': 'solid',
          'border-weight': '0px',
          'width': '15px',
          'height': '15px',
          'font-size': '10px',
          'background-color': '#fc603d',
        },
        'Anti-Racist': {
          'border-color': 'black',
          'border-style': 'solid',
          'border-weight': '0px',
          'width': '15px',
          'height': '15px',
          'font-size': '10px',
          'background-color': '#145bff',
        },
      },
    },
  },
  dataSources: {
    datapoints,
  },
  router: {
    enabled: false,
  },
  projection: '4326',
  // geocoder: {
  //   url(input) {
  //     const inputEncoded = encodeURIComponent(input);
  //     return `//api.phila.gov/finder/v1/search/${inputEncoded}`;
  //   },
  //   params: {
  //     include_units: true,
  //   },
  // },
  footer: {
    cityLink: false,
    aboutFinder: false,
    HowToUse: false,
    feedback: {
      enabled: true,
      link: 'https://airtable.com/shrwPfZmyYDiz6BsZ',
    },
    OtherLinks: [
      {
        text: 'Contribute',
        link: 'https://airtable.com/shrQ8Xqx9flpQA09h',
      },
      // {
      //   text: 'Partner Organization',
      //   link: 'http://google.com/',
      // },
      // {
      //   text: 'Architecture Lobby',
      //   link: 'http://architecture-lobby.org/',
      // },
    ],
  },
  refine: {
    // type: 'categoryField_value',
    // value: function(item) {
    //   return item.category_type;
    // },
    type: 'multipleFieldGroups',
    multipleFieldGroups: {
      Category: {
        'Racist': {
          unique_key: 'Racist',
          value: function(item) { return item.category_type === 'Racist'; },
        },
        'Anti-Racist': {
          unique_key: 'Anti-Racist',
          value: function(item) { return item.category_type === 'Anti-Racist'; },
        },
      },
      'Type of Site': {
        'Statue': {
          unique_key: 'statue',
          value: function(item) { return item.site_type === 'Statue'; },
        },
        'Street': {
          unique_key: 'street',
          value: function(item) { return item.site_type === 'Street'; },
        },
        'Building': {
          unique_key: 'building',
          value: function(item) { return item.site_type === 'Building'; },
        },
        'Mural': {
          unique_key: 'mural',
          value: function(item) { return item.site_type === 'Mural'; },
        },
        'Other': {
          unique_key: 'other',
          value: function(item) { return item.site_type === 'Other'; },
        },
      }
    },
  },
  // refine: {
  //   type: 'categoryField_value',
  //   value: function(item) {
  //       return item.category_type, item.site_type;
  //   },
  // },

//  HOW TO MAKE REFINE INCLUDE MULTIPLE AIRTABLE FIELDS? WANT SOMETHING LIKE BELOW:



  hiddenRefine: {
      Review: function(item) {
        return item.reviewed === 'Yes';
      },
    },


  map: {
    type: 'mapbox',
    tiles: 'hosted',
    containerClass: 'map-container',
    // containerClass: 'map-container-no-refine',
    defaultBasemap: 'pwd',
    center: [ -75.163471, 39.953338 ],
    minZoom: 11,
    maxZoom: 25,
    shouldInitialize: true,

    zoom: 12,
    geocodeZoom: 15,
    imagery: {
      enabled: false,
    },
    basemaps: {
      pwd: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer',
        tiledLayers: [
          'cityBasemapLabels',
        ],
        type: 'featuremap',
        attribution: 'Parcels: Philadelphia Water',
      },
    },
    tiledLayers: {
      cityBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer',
        zIndex: '3',
      },
    },
  },
  // mbStyle: 'mapbox://styles/ajrothwell/ck6gz6rmk04681ir1fdmagq5h',
  // mbStyle: 'mapbox://styles/ajrothwell/ckbe4eocm0zmu1ipbdk8ebk0a',
  // mbStyle: 'mapbox://styles/mapbox/satellite-streets-v11',
  // mbStyle: 'mapbox://styles/mapbox/streets-v11',
  // mbStyle: 'mapbox://styles/mapbox/outdoors-v11',
  // mbStyle: 'mapbox://styles/mapbox/light-v10',
  mbStyle: 'mapbox://styles/mapbox/dark-v10',
  // mbStyle: 'mapbox://styles/mapbox/outdoors-v11',
     // mbStyle: 'mapbox://styles/nbkrapf/ckbh7fsfa08po1is802aeg8me',
  // mbStyle: {
  //   version: 8,
  //   sources: {
  //     pwd: {
  //       tiles: [
  //         'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
  //         // 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
  //         // 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
  //       ],
  //       type: 'raster',
  //       tileSize: 256,
  //     },
  //   },
  //   layers: [
  //     {
  //       id: 'pwd',
  //       type: 'raster',
  //       source: 'pwd',
  //     },
  //   ],
  // },
  basemapSources: {
    pwd: {
      source: {
        tiles: [
          // 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
          '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'pwd',
        type: 'raster',
      },
    },
    imagery2019: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imagery2019',
        type: 'raster',
      },
    },
  },
  basemapLabelSources:{
    cityBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'cityBasemapLabels',
        type: 'raster',
      },
    },
    imageryBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imageryBasemapLabels',
        type: 'raster',
      },
    },
  },
});
