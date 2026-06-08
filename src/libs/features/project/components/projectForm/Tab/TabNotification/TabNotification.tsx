import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Controller, FieldPath, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { ICreateProjectForm } from '@/pages/project/sections/CreateProject';
import { CustomTextField } from '@/libs/components/ui/TextField';
import { NOTIFICATION_OPTIONS } from '@/libs/constants/notification.ts';

export default function TabNotification() {
  const { t } = useTranslation();
  const { control } = useFormContext<ICreateProjectForm>();

  return (
    <Box
      sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}
    >
      <Controller
        name="komuChannelId"
        control={control}
        render={({ field }) => (
          <CustomTextField
            {...field}
            placeholder={t('project.notification.komuChannelIdPlaceholder')}
            fullWidth
          />
        )}
      />
      {NOTIFICATION_OPTIONS.map(({ label, field }) => (
        <Controller
          name={field as FieldPath<ICreateProjectForm>}
          control={control}
          render={({ field: field }) => (
            <FormControlLabel
              sx={{ m: 0 }}
              control={
                <Checkbox
                  checked={!!field.value}
                  onChange={field.onChange}
                  size="medium"
                  sx={{
                    mr: 0.5,
                    color: '#c5c4c4',
                    '&.Mui-checked': { color: '#4680ff' },
                  }}
                />
              }
              label={
                <CustomTypography
                  sx={{ fontSize: 14, fontWeight: 500, color: '#1D2630' }}
                >
                  {t(label)}
                </CustomTypography>
              }
            />
          )}
        />
      ))}
    </Box>
  );
}
