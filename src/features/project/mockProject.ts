export interface ProjectItem {
  id: number;
  name: string;
  projectManager: string[];
  members: number;
  type: string;
  startDate: string;
  endDate: string;
}

export interface ProjectGroup {
  clientId: number;
  clientName: string;
  items: ProjectItem[];
}

export const mockProject: ProjectGroup[] = [
  {
    clientId: 1,
    clientName: 'nguyen thi thanh hường',
    items: [
      {
        id: 1,
        name: 'Project 20165',
        projectManager: 'Dũng Nguyễn Mạnh ',
        members: 8,
        type: 'T&M',
        startDate: '01/03/2026',
        endDate: '30/06/2026',
      },
      {
        id: 2,
        name: 'Project 20165',
        projectManager: 'Tiến Phạm Mạnh ',
        members: 5,
        type: 'FF',
        startDate: '15/03/2026',
        endDate: '15/05/2026',
      },
      {
        id: 3,
        name: 'TM',
        projectManager: 'Anh Đỗ Tuấn',
        members: 4,
        type: 'T&M',
        startDate: '20/03/2026',
        endDate: '10/07/2026',
      },
      {
        id: 4,
        name: 'Test Create Shadow - Try 1 ',
        projectManager: 'Anh Đỗ Tuấn',
        members: 4,
        type: 'T&M',
        startDate: '20/03/2026',
        endDate: '10/07/2026',
      },
      {
        id: 5,
        name: 'Test demo valid ',
        projectManager: 'Anh Đỗ Tuấn',
        members: 4,
        type: 'T&M',
        startDate: '20/03/2026',
        endDate: '10/07/2026',
      },
    ],
  },
  {
    clientId: 2,
    clientName: 'edit_api2',
    items: [
      {
        id: 4,
        name: 'Project new',
        projectManager: 'Thái Bùi Minh ',
        members: 10,
        type: 'FF',
        startDate: '05/04/2026',
        endDate: '30/09/2026',
      },
      {
        id: 5,
        name: 'Project 20165 ',
        projectManager: 'Tụ Ma Văn, Văn Trần Ngọc ',
        members: 6,
        type: 'T&M',
        startDate: '12/04/2026',
        endDate: '20/08/2026',
      },
    ],
  },
  {
    clientId: 3,
    clientName: 'Client7',
    items: [
      {
        id: 6,
        name: 'TEST123456789',
        projectManager: 'Nguyễn Thanh Tùng',
        members: 7,
        type: 'FF',
        startDate: '01/05/2026',
        endDate: '31/07/2026',
      },
      {
        id: 7,
        name: 'Project 3',
        projectManager: 'Võ Minh Quân',
        members: 12,
        type: 'T&M',
        startDate: '10/05/2026',
        endDate: '30/11/2026',
      },
      {
        id: 8,
        name: 'MENSCHEN',
        projectManager: 'Tiến Nguyễn Hữu',
        members: 5,
        type: 'FF',
        startDate: '18/05/2026',
        endDate: '18/08/2026',
      },
    ],
  },
];
