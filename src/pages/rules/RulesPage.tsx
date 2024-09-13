import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material'
import { Color } from 'utils/types'

export default function RulesPage() {
  return (
    <Box display="flex" justifyContent={'center'}>
      <Box>
        <Typography variant="h4">
          Правила проведения описывают все аспекты Аукуса
        </Typography>

        <Box marginTop={4}>
          <Box>
            <Accordion
              sx={{
                borderRadius: '15px',
                background: Color.greyDark,
                boxShadow: 'none',
              }}
              square={true}
            >
              <AccordionSummary
                sx={{ background: Color.greyDark, borderRadius: '15px' }}
              >
                <Typography variant="h5">1. Время проведения</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ background: Color.greyDark, borderRadius: '15px' }}
              >
                <Typography variant="body2">
                  Ивент проводится с 1 ноября по 30 ноября
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box marginTop={2}>
            <Accordion
              sx={{
                borderRadius: '15px',
                background: Color.greyDark,
                boxShadow: 'none',
              }}
              square={true}
            >
              <AccordionSummary
                sx={{ background: Color.greyDark, borderRadius: '15px' }}
              >
                <Typography variant="h5">2. Правила хода</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ background: Color.greyDark, borderRadius: '15px' }}
              >
                <Typography variant="body2">
                  Ивент проводится с 1 ноября по 30 ноября
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box marginTop={2}>
            <Accordion
              sx={{
                borderRadius: '15px',
                background: Color.greyDark,
                boxShadow: 'none',
              }}
              square={true}
            >
              <AccordionSummary
                sx={{ background: Color.greyDark, borderRadius: '15px' }}
              >
                <Typography variant="h5">3. Правила заказа игры</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ background: Color.greyDark, borderRadius: '15px' }}
              >
                <Typography variant="body2">
                  Ивент проводится с 1 ноября по 30 ноября
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box marginTop={2}>
            <Accordion
              sx={{
                borderRadius: '15px',
                background: Color.greyDark,
                boxShadow: 'none',
              }}
              square={true}
            >
              <AccordionSummary
                sx={{ background: Color.greyDark, borderRadius: '15px' }}
              >
                <Typography variant="h5">4. Наказание проигравшему</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ background: Color.greyDark, borderRadius: '15px' }}
              >
                <Typography variant="body2">
                  Ивент проводится с 1 ноября по 30 ноября
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
