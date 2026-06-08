import { useState } from 'react';
import { Box, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { CustomTextField } from '@/libs/components/ui/TextField';

interface ICustomTimeDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (start: string, end: string) => void;
}
export default function CustomTimeDialog({
  open,
  onClose,
  onSave,
}: ICustomTimeDialogProps) {
  const { t } = useTranslation();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const handleSave = () => {
    if (!start || !end) return;
    onSave(start, end);
    setStart('');
    setEnd('');
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      sx={{ '& .MuiDialog-paper': { borderRadius: '12px !important' } }}
    >
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 1 }}>
          <Box>
            <CustomTypography sx={{ fontSize: 14, color: '#959595', mb: 0.5 }}>
              {t('project.view.customTime.fromDate')}
            </CustomTypography>
            <CustomTextField
              fullWidth
              type="date"
              size="small"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </Box>
          <Box>
            <CustomTypography sx={{ fontSize: 14, color: '#959595', mb: 0.5 }}>
              {t('project.view.customTime.toDate')}
            </CustomTypography>
            <CustomTextField
              fullWidth
              type="date"
              size="small"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <CustomButton
          variant="outlined"
          onClick={onClose}
          sx={{ color: '#4680ff' }}
        >
          {t('project.cancel')}
        </CustomButton>
        <CustomButton
          variant="contained"
          onClick={handleSave}
          disabled={!start || !end}
          sx={{ bgcolor: '#4680ff', boxShadow: 'none' }}
        >
          {t('project.save')}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
