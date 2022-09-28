import React, {Fragment, useMemo, useState} from 'react'
import {NextPage} from 'next'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
  Stack,
  TextareaAutosize,
  ToggleButtonGroup, ToggleButton
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import SendIcon from '@mui/icons-material/Send'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'
import {
  ColDef,
  ColGroupDef
} from 'ag-grid-community'

const AddProjectPage: NextPage = () => {

  const strategies = [
    {value: 'strategy-2', name: 'กลยุทธ์ที่ 2 Healthcare Personal Academy (ผลิตแพทย์และบุคลากรด้านสุขภาพที่เชี่ยวชาญและเพียงพอต่อความต้องการประเทศ)'},
    {value: 'strategy-4', name: 'กลยุทธ์ที่ 4 จัดบริการทางการแพทย์แบบครบวงจรอย่างไร้รอยต่อ (Seamless Comprehesive Healthcare)'},
    {value: 'strategy-6', name: 'กลยุทธ์ที่ 6 สร้างงานวิจัยและนวัตกรรมที่มีผลกระทบสูง (High Impact Research, TA and Innovation)'}
  ]

  const agencyProjects = [
    {value: 'project-1', name: 'โครงการกรมฯ ที่ 1 โครงการการเรียนการสอนแพทย์เฉพาะทางต่อยอดความเชี่ยวชาญเพื่อยกระดับสถานพยาบาลและแก้ไขปัญหาการขาดแคลนทางการแพทย์ทั้งภาครัฐและเอกชน'},
    {value: 'project-2', name: 'โครงการกรมฯ ที่ 2 โครงการสนับสนุนการเป็นเมืองศูนย์การบริการสุขภาพในอาเซียน'},
    {value: 'project-3', name: 'โครงการกรมฯ ที่ 3.โครงการถ่ายทอดองค์ความรู้ นวัตกรรม และเทคโนโลยีทางการแพทย์แก่บุคลากรด้านสุภาพทั้งภาครัฐและภาคเอกชน'},
    {value: 'project-5', name: 'โครงการกรมฯ ที่ 5.โครงการพัฒนาระบบบริการทางการแพทย์ด้านความเป็นเลิศเฉพาะทาง เพื่อประชาชนเข้าถึงระบบริการทางการแพทย์ในเขตสุขภาพที่ได้มาตรฐาน ครบวงจรอย่างไร้รอยต่อ'}
  ]

  const [strategy, setStrategy] = useState('')
  const [agencyProject, setAgencyProject] = useState('')
  const [fundType, setFundType] = useState('งบดำเนินงาน')

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

  const [rowData, setRowData] = useState([{
    item: 'Copy ข้อมูลจาก Excel มาใส่ใน Cell นี้',
    timesPerClass: 0,
    type1Count: 0,
    type2Count: 0,
    type3Count: 0,
    allCount: 0,
    quantity: 0,
    unit: 'หน่วยนับ',
    rateQuantity: 0,
    rateUnit: 'หน่วยนับ'
  }])

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
      // allow every column to be aggregated
      // enableValue: true,
      // allow every column to be grouped
      // enableRowGroup: true,
      // allow every column to be pivoted
      // enablePivot: true,
      wrapText: true,     // Enable wrap text for long text
      autoHeight: true,   // Allow height to be auto-adjusted for wrapped text
      wrapHeaderText: true, // Enable wrap text for column headers
      autoHeaderHeight: true, // Allow height to be auto-adjusted for wrapped header text
    };
  }, []);

  const processDataFromClipboard = (params: any) => {
    console.log('Pasted from clipboard')
    console.log(params)

    const emptyLastRow = params.data[params.data.length - 1][0] === ''
      && params.data[params.data.length - 1].length === 1;

    if(emptyLastRow) {
      params.data.splice(params.data.length - 1, 1);
    }

    const lastIndex = params.api.getModel().rowsToDisplay.length - 1;
    const focusedCell = params.api.getFocusedCell();
    const focusedIndex = focusedCell.rowIndex;

    if(focusedIndex + params.data.length - 1 > lastIndex) {
      const resultLastIndex = focusedIndex + (params.data.length - 1);
      const addRowCount = resultLastIndex - lastIndex;
      let rowsToAdd = [];
      let addedRows = 0;
      let currIndex = params.data.length - 1;
      while(addedRows < addRowCount) {
        rowsToAdd.push(params.data.splice(currIndex, 1)[0]);
        addedRows++;
        currIndex--;
      }
      rowsToAdd = rowsToAdd.reverse();
      let newRowData: any = [];
      rowsToAdd.map(r => {
        let row = {};
        let currColumn = focusedCell.column;
        r.map((i: any) => {
          const field = currColumn.colDef.field
          //@ts-ignore
          row[field] = i;
          currColumn = params.columnApi.getDisplayedColAfter(currColumn);
        });
        newRowData.push(row);
      })
      params.api.updateRowData({add: newRowData});
    }
    return params.data;
  }

  function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    console.log('Strategy: ' + strategy)
    console.log('Agency project: ' + agencyProject)
    console.log('Fund type: ' + fundType)
  }

  return <Fragment>
    <Stack spacing={2}>
      <Typography variant="h4" mt={2} gutterBottom>
        <AddCircleIcon /> เพิ่มโครงการ (18.1 ฟอร์มชี้แจงโครงการ)
      </Typography>

      <Grid2 container>
        <Grid2 xs={6} md={8}>
          <Stack spacing={2}>
            {/* Dropdown กลยุทธ์ */}
            <FormControl fullWidth>
              <InputLabel id="strategy-label">กลยุทธ์</InputLabel>
              <Select
                labelId="strategy-label"
                id="strategy-select"
                value={strategy}
                onChange={e => setStrategy(e.target.value)}
                label="Age"
              >
                {strategies.map(strategy => {
                  return <MenuItem key={strategy.value} value={strategy.value}>{strategy.name}</MenuItem>
                })}
              </Select>
            </FormControl>

            {/* Dropdown โครงการกรม */}
            <FormControl fullWidth>
              <InputLabel id="agency-project-label">โครงการกรมฯ</InputLabel>
              <Select
                labelId="agency-project-label"
                id="agency-project-select"
                value={agencyProject}
                onChange={e => setAgencyProject(e.target.value)}
                label="Age"
              >
                {agencyProjects.map(agencyProject => {
                  return <MenuItem key={agencyProject.value} value={agencyProject.value}>{agencyProject.name}</MenuItem>
                })}
              </Select>
            </FormControl>

            {/*Button Group งบรายจ่าย */}
            <FormControl>
              <ToggleButtonGroup
                value={fundType}
                exclusive
                onChange={(e, newValue) => setFundType(newValue)}
                aria-label="text alignment"
              >
                <ToggleButton value="งบดำเนินงาน" aria-label="left aligned">
                  งบดำเนินงาน
                </ToggleButton>
                <ToggleButton value="งบลงทุน" aria-label="centered">
                  งบลงทุน
                </ToggleButton>
                <ToggleButton value="งบอุดหนุน" aria-label="right aligned">
                  งบอุดหนุน
                </ToggleButton>
                <ToggleButton value="งบรายจ่ายอื่น" aria-label="justified">
                  งบรายจ่ายอื่น
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Stack>

        </Grid2>
      </Grid2>

      {/*AG Grid สำหรับกรอกข้อมูล*/}
      <div className="ag-theme-alpine" style={{height: 500}}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          processDataFromClipboard={processDataFromClipboard}
          suppressAggFuncInHeader={true}
        />
      </div>

      {/* Textarea ข้อมูลเพิ่มเติม */}
      <TextareaAutosize
        aria-label="ข้อมูลเพิ่มเติม"
        minRows={3}
        placeholder="ข้อมูลเพิ่มเติม"
      />
      <div>
        <Button variant="contained" startIcon={<SendIcon />} onClick={onSubmit}>Submit</Button>
      </div>
    </Stack>

  </Fragment>
}

export default AddProjectPage