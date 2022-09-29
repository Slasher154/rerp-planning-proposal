import {NextPage} from 'next'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {Typography, Stack} from '@mui/material'
import React, {useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'
import {ColDef, ColGroupDef} from 'ag-grid-community'
const ProjectSummaryPage: NextPage = () => {

  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: 'รายการ',
      field: 'item',
      minWidth: 500
    },
    {
      headerName: 'รายละเอียดงบประมาณปี 2567',
      groupId: 'currentYear',
      children: [
        {
          headerName: 'จำนวนครั้ง/รุ่น (1)',
          field: 'timesPerClass',
          width: 120,
          filter: 'agTextColumnFilter',
        },
        {
          headerName: 'จำนวนผู้เข้ารับการฝึกอบรม (คน)',
          groupId: 'participantsCount',
          children: [
            { headerName: 'ประเภท ก (2)', field: 'type1Count', width: 120 },
            { headerName: 'ประเภท ข (3)', field: 'type2Count', width: 120 },
            { headerName: 'บุคคลภายนอก (4)', field: 'type3Count', width: 120 },
            { headerName: 'รวม (2+3+4) = (5)', field: 'allCount', width: 120 }
          ],
        },
        {
          headerName: 'ระบุจำนวน (เช่น ชั่วโมง, วัน เป็นต้น)',
          groupId: 'unit',
          children: [
            { headerName: 'จำนวน (6)', field: 'quantity', width: 120 },
            { headerName: 'หน่วยนับ', field: 'unit', width: 120 },
          ],
        },
        {
          headerName: 'อัตราค่าใช้จ่ายที่ตั้ง',
          groupId: 'rate',
          children: [
            { headerName: 'อัตราค่าใช้จ่าย (7)', field: 'rateQuantity', width: 120 },
            { headerName: 'หน่วยนับ', field: 'rateUnit', width: 120 },
          ],
        }
      ],
    }
  ]);



  return (
    <Stack spacing={2}>
      <Typography variant="h4" mt={2} gutterBottom>
        สรุปโครงการทั้งหมด
      </Typography>
    </Stack>
  )
}

export default ProjectSummaryPage
