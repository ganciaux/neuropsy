import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import FolderIcon from '@mui/icons-material/Folder'
import CommonLoader from '../../components/common/CommonLoader/CommonLoader'
import CommonLoaderAlert from '../../components/common/CommonLoader/CommonLoaderAlert'
import CommonPageHeader from '../../components/common/CommonPageHeader/CommonPageHeader'
import CommonDateRange from '../../components/common/CommonDateRange/CommonDateRange'
import { reportType } from '../../components/Report/consts/reportType'
import CommonSelect from '../../components/common/CommonSelect/CommonSelect'
import { getReport } from '../../api/api'
import CommonAlert from '../../components/common/CommonAlert/CommonAlert'

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  )
}

const reportYears = [
  { id: 2020, value: 2020, label: '2020' },
  { id: 2020, value: 2021, label: '2021' },
  { id: 2020, value: 2022, label: '2022' },
  { id: 2020, value: 2023, label: '2023' },
]

const reportPeriods = [
  { id: 1, value: 1, label: '1er trimestre' },
  { id: 2, value: 2, label: '2ème trimestre' },
  { id: 3, value: 3, label: '3ème trimestre' },
  { id: 4, value: 4, label: '4ème trimestre' },
]

const Report = () => {
  const [filters, setFilters] = useState({
    type: 1,
    year: 2020,
    period: 1,
    dates: [null, null],
  })

  const handleSearch = () => {
    console.log(filters)
    refetch()
  }

  const handleOnChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleOnChangeRange = (dates) => {
    setFilters({ ...filters, dates })
  }

  useEffect(() => {
    const dates = filters.dates[0] != undefined && filters.dates[1] != undefined
  }, [filters])

  const { data, error, refetch, isLoading, isSuccess } = useQuery(
    'reports',
    () => getReport(filters),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log('Get retports!')
        console.log(data)
      },
    },
  )

  const submitHandlerLogout = async () => {
    refetch()
  }

  return (
    <CommonPageHeader title="Report">
      <Grid container spacing={1}>
        <Grid xs={4} item>
          <CommonSelect
            name="type"
            label="Type"
            id="selectType"
            data={reportType}
            onChange={handleOnChange}
            value={filters.type}
            defaultValue
            all
          />
        </Grid>
        {filters.type === 2 ? (
          <Grid item xs={8}>
            <CommonDateRange
              onChange={handleOnChangeRange}
              dates={filters.dates}
            />
          </Grid>
        ) : (
          <>
            <Grid item xs={4}>
              <CommonSelect
                name="year"
                label="Année"
                id="selectYear"
                data={reportYears}
                onChange={handleOnChange}
                value={filters.year}
                defaultValue
                all
              />
            </Grid>
            <Grid item xs={4}>
              <CommonSelect
                name="period"
                label="Période"
                id="selectPeriod"
                data={reportPeriods}
                onChange={handleOnChange}
                value={filters.period}
                defaultValue
                all
              />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Chercher
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {isLoading && <CommonLoader />}
        {error && (
          <CommonAlert title="" content={error.message} severity="error" />
        )}
        {data && (
          <List>
            {generate(
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Single-line item xgsdr g awsergeèr hge hewhge ehehersh eerhesth  e hethjhe3 heh" />
              </ListItem>,
            )}
          </List>
        )}
      </Grid>
    </CommonPageHeader>
  )
}

export default Report
