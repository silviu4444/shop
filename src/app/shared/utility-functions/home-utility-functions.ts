import { Laptop } from "src/app/modules/home/pages/home/models/laptop.model";
import { MobilePhone } from "src/app/modules/home/pages/home/models/phone.model";
import { TableSpecs } from "../interfaces/interfaces";

export const updatePhoneTitleGBs = (title: string, gbToReplace: string) => {
  const splittedTitle = title.split(',');
  const filterRAM = splittedTitle.filter(
    (element) => element.indexOf('RAM') > -1
  );
  const indexOfRAM = splittedTitle.indexOf(filterRAM[0]);
  splittedTitle.splice(indexOfRAM, 1, ' ' + gbToReplace + 'GB RAM');
  const updatedTitle = splittedTitle.join(',');
  return updatedTitle;
};


export const createPhoneTitle = (phone: MobilePhone) => {
  const colorKeys = Object.keys(phone.specs.colors);
  const color = colorKeys[0];
  const manufacturer = phone.manufacturer;
  const model = phone.model;
  const sim = phone.specs.sim ? ', ' + phone.specs.sim : '';
  const memoryRAM = phone.specs.memoryRam[0];
  const network = phone.specs.mobileNetwork;
  return `${manufacturer} ${model}${sim}, ${memoryRAM}GB RAM, ${network}, ${color}`;
};

export const createLaptopTitle = (laptop: Laptop) => {
  const manufacturer = laptop.manufacturer;
  const model = laptop.model;
  const processor = laptop.specs.processor;
  const inch = laptop.specs.inch;
  const memory = laptop.specs.memory;
  return `${manufacturer} ${model}, ${processor}, ${inch}", ${memory}`;
};

export const addDetailsToItem = (items, selectedItem): MobilePhone | Laptop => {
  return !!selectedItem
    ? items
        .filter((item) => item.id === selectedItem.id)
        .map((item) => ({
          ...item,
          inDepthDetails: selectedItem
        }))[0]
    : null;
};

export const createPhoneTableData = (phone: MobilePhone): TableSpecs[] => {
  return [
    {
      property: 'General Details',
      value: ''
    },
    {
      property: 'Manufacturer',
      value: phone.manufacturer
    },
    {
      property: 'Model',
      value: phone.model
    },
    {
      property: 'Connectivity',
      value: phone.inDepthDetails.specs.general.connectivity
    },
    {
      property: 'Network',
      value: phone.specs.mobileNetwork
    },
    {
      property: 'SIM',
      value: phone.inDepthDetails.specs.general.sim
    },
    {
      property: 'SIM Type',
      value: phone.inDepthDetails.specs.general.simType
    },
    {
      property: 'OS',
      value: phone.inDepthDetails.specs.general.os
    },
    {
      property: 'OS Version',
      value: phone.inDepthDetails.specs.general.osVersion
    },
    {
      property: 'Package',
      value: phone.inDepthDetails.specs.general.package
    },
    {
      property: 'Phone Type',
      value: phone.inDepthDetails.specs.general.phoneType
    },
    {
      property: 'SIM',
      value: phone.inDepthDetails.specs.general.sim
    },
    {
      property: 'SIM Type',
      value: phone.inDepthDetails.specs.general.simType
    },
    {
      property: 'Year',
      value: phone.inDepthDetails.specs.general.year
    },
    {
      property: 'Display',
      value: ''
    },
    {
      property: 'Display Type',
      value: phone.inDepthDetails.specs.display.display
    },
    {
      property: 'Resolution',
      value: phone.inDepthDetails.specs.display.resolution
    },
    {
      property: 'Screen Size',
      value: phone.inDepthDetails.specs.display.screenSize + '"'
    },
    {
      property: 'Cameras',
      value: ''
    },
    {
      property: 'Main Camera',
      value: phone.inDepthDetails.specs.fotoVideo.mainCamera
    },
    {
      property: 'Number of Cameras',
      value: phone.inDepthDetails.specs.fotoVideo.numberOfCameras
    },
    {
      property: 'Battery',
      value: ''
    },
    {
      property: 'Capacity',
      value: phone.inDepthDetails.specs.battery.capacity + ' ' + 'mAh'
    },
    {
      property: 'Type',
      value: phone.inDepthDetails.specs.battery.type
    }
  ];
};

export const createLaptopTableData = (laptop: Laptop): TableSpecs[] => {
  return [
    {
      property: 'General Details',
      value: ''
    },
    {
      property: 'Manufacturer',
      value: laptop.manufacturer
    },
    {
      property: 'Model',
      value: laptop.inDepthDetails.specs.general.model
    },
    {
      property: 'Weight',
      value: laptop.inDepthDetails.specs.general.weight + ' ' + 'Kg'
    },
    {
      property: 'Processor',
      value: laptop.specs.processor
    },

    {
      property: 'Display',
      value: ''
    },
    {
      property: 'Display Technology',
      value: laptop.inDepthDetails.specs.display.display
    },
    {
      property: 'Display Type',
      value: laptop.specs.display
    },
    {
      property: 'Resolution',
      value: laptop.inDepthDetails.specs.display.resolution
    },
    {
      property: 'Inch',
      value: laptop.inDepthDetails.specs.display.inch
    },
    {
      property: 'Memory',
      value: ''
    },
    {
      property: 'Hard Disk',
      value: laptop.specs.memory
    },
    {
      property: 'SSD',
      value:
        laptop.inDepthDetails.specs.hardDisk.capacity
    },
    {
      property: 'Video',
      value: ''
    },
    {
      property: 'Video Card',
      value: laptop.inDepthDetails.specs.video.type
    }
  ];
};
