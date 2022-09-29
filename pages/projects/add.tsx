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
  Box,
  Tabs,
  Tab,
  TextareaAutosize,
  ToggleButtonGroup, ToggleButton, TextField, FormGroup, FormControlLabel, Checkbox, FormLabel, Input
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
import {TabPanel, a11yProps} from '@components/ui/tabs/tabPanel'

const AddProjectPage: NextPage = () => {

  const [tabIndex, setTabIndex] = useState(0);

  const costCenters = [
    {value: 'cost-center-1', name: 'ทรัพยากรบุคคล'},
    {value: 'cost-center-2', name: 'พยาบาล'},
    {value: 'cost-center-3', name: 'เวชศาสตร์ฟื้นฟู'},
    {value: 'cost-center-4', name: 'โสต ศอ นาสิก'},
  ]

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

  const [costCenter, setCostCenter] = useState('')
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

            {/* Texfield ชื่อโครงการ */}
            <TextField
              required
              color="secondary"
              id="project-name"
              label="ชื่อโครงการ"
              variant="outlined" />

            {/* Dropdown กลยุทธ์ */}
            <FormControl fullWidth>
              <InputLabel id="cost-center-label">หน่วยงาน</InputLabel>
              <Select
                labelId="cost-center-label"
                id="cost-center-select"
                value={costCenter}
                onChange={e => setCostCenter(e.target.value)}
                label="หน่วยงาน"
              >
                {costCenters.map(costCenter => {
                  return <MenuItem key={costCenter.value} value={costCenter.value}>{costCenter.name}</MenuItem>
                })}
              </Select>
            </FormControl>

            {/* Dropdown กลยุทธ์ */}
            <FormControl fullWidth>
              <InputLabel id="strategy-label">กลยุทธ์</InputLabel>
              <Select
                labelId="strategy-label"
                id="strategy-select"
                value={strategy}
                onChange={e => setStrategy(e.target.value)}
                label="กลยุทธ์"
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

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} aria-label="basic tabs example">
            <Tab label="รายละเอียดค่าใช้จ่าย" {...a11yProps(0)} />
            <Tab label="รายละเอียดโครงการ" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* Tab รายละเอียดค่าใช้จ่าย */}
        <TabPanel value={tabIndex} index={0}>

          <Stack spacing={2}>

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

          </Stack>

        </TabPanel>

        {/* Tab รายละเอียดโครงการ */}
        <TabPanel value={tabIndex} index={1}>

          <Stack spacing={2}>

            <Typography variant={'h6'} sx={{textDecoration: 'underline'}}>1. ความเชื่อมโยง/ความสอดคล้องกับแผนยุทธศาสตร์แต่ละระดับ : </Typography>

            <FormControl component="fieldset">
              <FormLabel component="legend">1.1 ยุทธศาสตร์ชาติ</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="ความมั่นคง" />
                <FormControlLabel control={<Checkbox />} label="การสร้างความสามารถในการแข่งขัน" />
                <FormControlLabel control={<Checkbox />} label="การพัฒนาและเสริมสร้างศักยภาพทรัพยากรมนุษย์" />
                <FormControlLabel control={<Checkbox />} label="การสร้างโอกาสและความเสมอภาคทางสังคม" />
                <FormControlLabel control={<Checkbox />} label="การสร้างการเติบโตบนคุณภาพชีวิตที่เป็นมิตรกับสิ่งแวดล้อม" />
                <FormControlLabel control={<Checkbox />} label="การปรับสมดุลและพัฒนาระบบการบริหารจัดการภาครัฐ" />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">1.2 แผนแม่บทภายใต้ยุทธศาสตร์ชาติประเด็น (ระบุ):</FormLabel>
              <FormGroup row>
                <Input fullWidth placeholder={'เช่น 13 การเสริมสร้างให้คนไทยมีสุขภาวะที่ดี)'} />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">แผนย่อยของแผนแม่บทฯ (ระบุ) :</FormLabel>
              <FormGroup row>
                <Input fullWidth placeholder={'เช่น 13.3 การพัฒนาระบบบริการสุขภาพที่ทันสมัยสนับสนุนการสร้างสุขภาวะที่ดี)'} />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">1.3 แผนปฏิรูปด้านสาธารณสุข</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="ด้านระบบบริหารจัดการด้านสุขภาพ" />
                <FormControlLabel control={<Checkbox />} label="ด้านระบบบริการสาธารณสุข" />
                <FormControlLabel control={<Checkbox />} label="ด้านการคุ้มครองผู้บริโภค" />
                <FormControlLabel control={<Checkbox />} label="ด้านความยั่งยืนและเพียงพอด้านการเงินการคลังสุขภาพ" />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">1.3.1 แผนปฏิรูปด้านสาธารณสุขฉบับปรับปรุง (Big Rock)</FormLabel>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="การปฏิรูปการจัดการภาวะฉุกเฉินด้านสาธารณสุข รวมถึงโรคระบาดระดับชาติและโรคอุบัติใหม่ เพื่อความมั่นคงแห่งชาติด้านสุขภาพ" />
                <FormControlLabel control={<Checkbox />} label="การปฏิรูปเพื่อเพิ่มประสิทธิภาพและประสิทธิผลของการสร้างเสริมสุขภาพ ความรอบรู้ ด้านสุขภาพ การป้องกันและดูแลรักษาโรคไม่ติดต่อสาหรับประชาชนและผู้ป่วย" />
                <FormControlLabel control={<Checkbox />} label="การปฏิรูประบบบริการสุขภาพผู้สูงอายุด้านการบริบาล การรักษาพยาบาลที่บ้าน/ชุมชนและการดูแลสุขภาพตนเองในระบบสุขภาพปฐมภูมิเชิงนวัตกรรม" />
                <FormControlLabel control={<Checkbox />} label="การปฏิรูประบบหลักประกันสุขภาพและกองทุนที่เกี่ยวข้องให้มีความเป็นเอกภาพ บูรณาการ เป็นธรรมทั่วถึง เพียงพอและยั่งยืนด้านการเงินการคลัง" />
                <FormControlLabel control={<Checkbox />} label="การปฏิรูปเขตสุขภาพให้มีระบบบริหารจัดการแบบบูรณาการ คล่องตัว และการร่วมรับผิดชอบด้านสุขภาพระหว่างหน่วยงานและท้องถิ่น" />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">1.4 ยุทธศาสตร์กระทรวงสาธารณสุข</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="PP&P Excellence" />
                <FormControlLabel control={<Checkbox />} label="Service Excellence" />
                <FormControlLabel control={<Checkbox />} label="People Excellence" />
                <FormControlLabel control={<Checkbox />} label="Governance Excellence" />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">1.5 แผนปฏิรูปกรมการแพทย์</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="Function Reform" />
                <FormControlLabel control={<Checkbox />} label="Agenda Reform" />
                <FormControlLabel control={<Checkbox />} label="Area Reform" />
                <FormControlLabel control={<Checkbox />} label="System Reform" />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">1.6 แผนยุทธศาสตร์กรมการแพทย์:</FormLabel>
              <FormGroup>
                {/*<Input fullWidth placeholder={'เช่น 13.3 การพัฒนาระบบบริการสุขภาพที่ทันสมัยสนับสนุนการสร้างสุขภาวะที่ดี)'} />*/}
                <TextField
                  fullWidth
                  label="เป้าประสงค์"
                  variant="standard"
                />
                <hr/>
                <TextField
                  fullWidth
                  label="ยุทธศาสตร์"
                  variant="standard"
                />
                <hr/>
                <TextField
                  fullWidth
                  label="แผนงาน"
                  variant="standard"
                />
                <hr/>
                <TextField
                  fullWidth
                  label="โครงการ"
                  variant="standard"
                />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">1.7 แผนยุทธศาสตร์โรงพยาบาลราชวิถี:</FormLabel>
              <FormGroup>
                <TextField
                  fullWidth
                  label="ยุทธศาสตร์"
                  variant="standard"
                />
                <hr/>
                <TextField
                  fullWidth
                  label="เป้าประสงค์"
                  variant="standard"
                />
                <hr/>
                <TextField
                  fullWidth
                  label="กลวิธี"
                  variant="standard"
                />
                <hr/>
                <TextField
                  fullWidth
                  label="แผนปฏิบัติการ"
                  variant="standard"
                />
                <hr/>
                <TextField
                  fullWidth
                  label="ตัวชี้วัด"
                  variant="standard"
                />
              </FormGroup>
            </FormControl>

            <br/>

            <Typography variant={'h6'} sx={{textDecoration: 'underline'}}>2. หน่วยงานที่รับผิดชอบ</Typography>
            <TextField
              fullWidth
              label={'หน่วยงานที่รับผิดชอบ'}
              variant="standard"
            />

            <br/>

            {/* ผู้รับผิดชอบโครงการ */}
            <Typography variant={'h6'} sx={{textDecoration: 'underline'}}>3. ผู้รับผิดชอบโครงการ</Typography>

            <Grid2 spacing={1} container>
              <Grid2 xs={12} md={2}>
                <p>ผู้รับผิดชอบโครงการ</p>
              </Grid2>
              <Grid2 xs={12} md={4}>
                <TextField
                  label={'ชื่อ-นามสกุล'}
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 xs={12} md={3}>
                <TextField
                  label={'เบอร์โทรศัพท์'}
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 xs={12} md={3}>
                <TextField
                  label={'Email'}
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 xs={12} md={2}>
                <p>ผู้ประสานงาน</p>
              </Grid2>
              <Grid2 xs={12} md={4}>
                <TextField
                  label={'ชื่อ-นามสกุล'}
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 xs={12} md={3}>
                <TextField
                  label={'เบอร์โทรศัพท์'}
                  fullWidth
                  variant="standard"
                />
              </Grid2>
              <Grid2 xs={12} md={3}>
                <TextField
                  label={'Email'}
                  fullWidth
                  variant="standard"
                />
              </Grid2>
            </Grid2>

            <Typography variant={'h6'} sx={{textDecoration: 'underline'}}>4. หลักการและเหตุผล</Typography>


            {/* Textarea หลักการและเหตุผล */}
            <TextareaAutosize
              aria-label="หลักการและเหตุผล"
              minRows={5}
              placeholder="หลักการและเหตุผล"
            />

            <Typography variant={'h6'} sx={{textDecoration: 'underline'}}>5. วัตถุประสงค์ของโครงการ</Typography>

            {/* Textarea วัตถุประสงค์ของโครงการ */}
            <TextareaAutosize
              aria-label="วัตถุประสงค์ของโครงการ"
              minRows={5}
              placeholder="วัตถุประสงค์ของโครงการ"
            />

            <Typography variant={'h6'} sx={{textDecoration: 'underline'}}>6. สถานที่ดำเนินการ</Typography>

            <FormControl component="fieldset">
              {/*<FormLabel component="legend">1.3 แผนปฏิรูปด้านสาธารณสุข</FormLabel>*/}
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="สถานที่ราชการ" />
                <TextField
                  label={'ระบุ'}
                  variant="standard"
                />
              </FormGroup>
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="สถานที่เอกชน" />
                <TextField
                  label={'ระบุ'}
                  variant="standard"
                />
              </FormGroup>
            </FormControl>


          </Stack>

        </TabPanel>

      </Box>


      <div>
        <Button variant="contained" startIcon={<SendIcon />} onClick={onSubmit}>Submit</Button>
      </div>
    </Stack>

  </Fragment>
}

export default AddProjectPage