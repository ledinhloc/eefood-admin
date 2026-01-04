import type { VietnamGeoJSON } from "@/features/dashboard/types/dashboard.types.ts";

export const vietnamGeoJSON: VietnamGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Hà Nội', id: 'hanoi' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.6, 21.2],
            [105.6, 20.8],
            [106.0, 20.8],
            [106.0, 21.2],
            [105.6, 21.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Hồ Chí Minh', id: 'hochiminh' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.5, 11.0],
            [106.5, 10.6],
            [106.9, 10.6],
            [106.9, 11.0],
            [106.5, 11.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Huế', id: 'hue' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [107.4, 16.6],
            [107.4, 16.3],
            [107.8, 16.3],
            [107.8, 16.6],
            [107.4, 16.6],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Đà Nẵng', id: 'danang' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [108.0, 16.2],
            [108.0, 15.9],
            [108.3, 15.9],
            [108.3, 16.2],
            [108.0, 16.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Cần Thơ', id: 'cantho' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.6, 10.2],
            [105.6, 9.9],
            [105.9, 9.9],
            [105.9, 10.2],
            [105.6, 10.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Hải Phòng', id: 'haiphong' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.5, 20.9],
            [106.5, 20.6],
            [106.9, 20.6],
            [106.9, 20.9],
            [106.5, 20.9],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Lai Châu', id: 'laichau' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [103.0, 22.5],
            [103.0, 22.0],
            [103.5, 22.0],
            [103.5, 22.5],
            [103.0, 22.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Điện Biên', id: 'dienbien' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [103.0, 21.8],
            [103.0, 21.3],
            [103.5, 21.3],
            [103.5, 21.8],
            [103.0, 21.8],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Sơn La', id: 'sonla' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [103.5, 21.5],
            [103.5, 21.0],
            [104.2, 21.0],
            [104.2, 21.5],
            [103.5, 21.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Lạng Sơn', id: 'langson' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.5, 22.0],
            [106.5, 21.5],
            [107.0, 21.5],
            [107.0, 22.0],
            [106.5, 22.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Quảng Ninh', id: 'quangninh' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [107.0, 21.5],
            [107.0, 21.0],
            [107.8, 21.0],
            [107.8, 21.5],
            [107.0, 21.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Thanh Hóa', id: 'thanhhoa' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.3, 20.2],
            [105.3, 19.5],
            [106.0, 19.5],
            [106.0, 20.2],
            [105.3, 20.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Nghệ An', id: 'nghean' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [104.5, 19.5],
            [104.5, 18.5],
            [105.5, 18.5],
            [105.5, 19.5],
            [104.5, 19.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Hà Tĩnh', id: 'hatinh' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.5, 18.5],
            [105.5, 18.0],
            [106.2, 18.0],
            [106.2, 18.5],
            [105.5, 18.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Cao Bằng', id: 'caobang' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.0, 22.8],
            [106.0, 22.3],
            [106.5, 22.3],
            [106.5, 22.8],
            [106.0, 22.8],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Tuyên Quang', id: 'tuyenquang' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.0, 22.2],
            [105.0, 21.7],
            [105.5, 21.7],
            [105.5, 22.2],
            [105.0, 22.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Lào Cai', id: 'laocai' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [103.5, 22.8],
            [103.5, 22.2],
            [104.5, 22.2],
            [104.5, 22.8],
            [103.5, 22.8],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Thái Nguyên', id: 'thainguyen' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.5, 22.0],
            [105.5, 21.5],
            [106.0, 21.5],
            [106.0, 22.0],
            [105.5, 22.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Phú Thọ', id: 'phutho' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [104.8, 21.6],
            [104.8, 21.1],
            [105.4, 21.1],
            [105.4, 21.6],
            [104.8, 21.6],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Bắc Ninh', id: 'bacninh' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.0, 21.3],
            [106.0, 21.0],
            [106.3, 21.0],
            [106.3, 21.3],
            [106.0, 21.3],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Hưng Yên', id: 'hungyen' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.0, 21.0],
            [106.0, 20.7],
            [106.3, 20.7],
            [106.3, 21.0],
            [106.0, 21.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Ninh Bình', id: 'ninhbinh' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.7, 20.5],
            [105.7, 20.1],
            [106.1, 20.1],
            [106.1, 20.5],
            [105.7, 20.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Quảng Trị', id: 'quangtri' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.8, 17.2],
            [106.8, 16.7],
            [107.4, 16.7],
            [107.4, 17.2],
            [106.8, 17.2],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Quảng Ngãi', id: 'quangngai' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [108.5, 15.5],
            [108.5, 14.8],
            [109.0, 14.8],
            [109.0, 15.5],
            [108.5, 15.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Gia Lai', id: 'gialai' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [107.5, 14.5],
            [107.5, 13.5],
            [108.5, 13.5],
            [108.5, 14.5],
            [107.5, 14.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Khánh Hòa', id: 'khanhhoa' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [108.8, 12.8],
            [108.8, 12.0],
            [109.4, 12.0],
            [109.4, 12.8],
            [108.8, 12.8],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Lâm Đồng', id: 'lamdong' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [107.5, 12.3],
            [107.5, 11.3],
            [108.5, 11.3],
            [108.5, 12.3],
            [107.5, 12.3],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Đắk Lắk', id: 'daklak' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [107.5, 13.3],
            [107.5, 12.3],
            [108.5, 12.3],
            [108.5, 13.3],
            [107.5, 13.3],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Đồng Nai', id: 'dongnai' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.8, 11.3],
            [106.8, 10.8],
            [107.5, 10.8],
            [107.5, 11.3],
            [106.8, 11.3],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Tây Ninh', id: 'tayninh' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.8, 11.5],
            [105.8, 11.0],
            [106.3, 11.0],
            [106.3, 11.5],
            [105.8, 11.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Vĩnh Long', id: 'vinhlong' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.8, 10.5],
            [105.8, 10.0],
            [106.3, 10.0],
            [106.3, 10.5],
            [105.8, 10.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Đồng Tháp', id: 'dongthap' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.3, 10.8],
            [105.3, 10.3],
            [105.8, 10.3],
            [105.8, 10.8],
            [105.3, 10.8],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Cà Mau', id: 'camau' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [104.8, 9.5],
            [104.8, 8.8],
            [105.4, 8.8],
            [105.4, 9.5],
            [104.8, 9.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'An Giang', id: 'angiang' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [104.8, 10.8],
            [104.8, 10.2],
            [105.5, 10.2],
            [105.5, 10.8],
            [104.8, 10.8],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Nam Định', id: 'namdinh' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.0, 20.6],
            [106.0, 20.2],
            [106.4, 20.2],
            [106.4, 20.6],
            [106.0, 20.6],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Hà Nam', id: 'hanam' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [105.8, 20.7],
            [105.8, 20.4],
            [106.1, 20.4],
            [106.1, 20.7],
            [105.8, 20.7],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Vũng Tàu', id: 'vungtau' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [107.0, 10.6],
            [107.0, 10.2],
            [107.4, 10.2],
            [107.4, 10.6],
            [107.0, 10.6],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Kiên Giang', id: 'kiengiang' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [104.5, 10.5],
            [104.5, 9.5],
            [105.2, 9.5],
            [105.2, 10.5],
            [104.5, 10.5],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Quảng Nam', id: 'quangnam' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [107.8, 16.0],
            [107.8, 15.2],
            [108.5, 15.2],
            [108.5, 16.0],
            [107.8, 16.0],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'Bình Định', id: 'binhdinh' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [108.8, 14.5],
            [108.8, 13.8],
            [109.3, 13.8],
            [109.3, 14.5],
            [108.8, 14.5],
          ],
        ],
      },
    },
  ],
};
