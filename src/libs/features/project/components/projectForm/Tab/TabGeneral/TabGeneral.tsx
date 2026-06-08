import { useState } from 'react';
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Autocomplete,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomButton } from '@/libs/components/ui/Button';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { useClientQuery } from '@/libs/features/client/hook/useClientQuery.ts';
import { CustomTextField } from '@/libs/components/ui/TextField';
import FormRow from '@/libs/features/project/components/projectForm/Tab/TabGeneral/formRow.tsx';
import { ICreateProjectForm } from '@/pages/project/sections/CreateProject';
import { PROJECT_TYPES } from '@/libs/constants/projectType.ts';
import AddClientModal from '@/libs/features/client/components/addClientModal.tsx';
import { useTranslation } from 'react-i18next';

export default function TabGeneral() {
  const [openCreateNewClient, setOpenCreateNewClient] = useState(false);
  const { data: clients = [], isLoading } = useClientQuery();
  const { control } = useFormContext<ICreateProjectForm>();
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 1 }}>
      <FormRow label={t('project.fields.client')} required>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <Controller
            name="customerId"
            control={control}
            rules={{ required: t('project.validation.clientRequired') }}
            render={({ field, fieldState }) => {
              const selectedClient = clients.find((c) => c.id === field.value);
              return (
                <Autocomplete
                  value={selectedClient}
                  options={clients}
                  loading={isLoading}
                  disabled={isLoading}
                  sx={{ width: 320 }}
                  isOptionEqualToValue={(opt, val) => opt.id === val.id}
                  getOptionLabel={(opt) => `${opt.name} - [${opt.code}]`}
                  onChange={(_, newVal) =>
                    field.onChange(newVal ? newVal.id : '')
                  }
                  onBlur={() => field.onBlur()}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      placeholder={t('project.placeholders.chooseClient')}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      sx={{
                        '& .MuiInputBase-root': { minHeight: '40px' },
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                          fontSize: 14,
                          height: 40,
                        },
                        '& .MuiFormHelperText-root': {
                          ml: 0,
                        },
                      }}
                      slotProps={{
                        ...params.slotProps,
                        input: {
                          ...params.slotProps?.input,
                          endAdornment: (
                            <>
                              {isLoading ? (
                                <CircularProgress
                                  color="inherit"
                                  size={16}
                                  sx={{ mr: 1 }}
                                />
                              ) : null}
                              {params.slotProps?.input?.endAdornment}
                            </>
                          ),
                        },
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      <Box
                        sx={{
                          width: '100%',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {option.name} - [{option.code}]
                      </Box>
                    </li>
                  )}
                />
              );
            }}
          />
          <CustomButton
            variant="contained"
            startIcon={
              isLoading ? (
                <CircularProgress size={16} sx={{ color: '#fff' }} />
              ) : (
                <AddIcon />
              )
            }
            onClick={() => setOpenCreateNewClient(true)}
            disabled={isLoading}
            sx={{
              bgcolor: '#4680ff',
              '&:hover': { bgcolor: '#3f78ff' },
              boxShadow: 'none',
              borderRadius: 1.5,
              height: 40,
            }}
          >
            {t('project.newClient')}
          </CustomButton>
        </Box>
      </FormRow>

      <FormRow label={t('project.fields.projectName')} required>
        <Controller
          name="name"
          control={control}
          rules={{ required: t('project.validation.projectNameRequired') }}
          render={({ field, fieldState }) => (
            <CustomTextField
              {...field}
              size="small"
              placeholder={t('project.placeholders.projectName')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                width: 320,
                '& .MuiInputBase-root': { minHeight: '40px' },
                '& .MuiOutlinedInput-root': { borderRadius: 1.5, fontSize: 14 },
                '& .MuiFormHelperText-root': { ml: 0 },
              }}
            />
          )}
        />
      </FormRow>
      <FormRow label={t('project.fields.projectCode')} required>
        <Controller
          name="code"
          control={control}
          rules={{ required: t('project.validation.projectCodeRequired') }}
          render={({ field, fieldState }) => (
            <CustomTextField
              {...field}
              size="small"
              placeholder={t('project.placeholders.projectCode')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              sx={{
                width: 320,
                '& .MuiInputBase-root': { minHeight: '40px' },
                '& .MuiOutlinedInput-root': { borderRadius: 1.5, fontSize: 14 },
                '& .MuiFormHelperText-root': { ml: 0 },
              }}
            />
          )}
        />
      </FormRow>
      <FormRow label={t('project.fields.date')}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Controller
            name="timeStart"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                type="date"
                sx={{
                  width: 145,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    fontSize: 14,
                  },
                }}
              />
            )}
          />
          <CustomTypography sx={{ fontSize: 14, color: '#555' }}>
            {t('project.to')}
          </CustomTypography>
          <Controller
            name="timeEnd"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                type="date"
                sx={{
                  width: 145,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    fontSize: 14,
                  },
                }}
              />
            )}
          />
        </Box>
      </FormRow>
      <FormRow label={t('project.fields.note')}>
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <CustomTextField
              {...field}
              size="small"
              multiline
              rows={3}
              sx={{
                width: 620,
                '& .MuiOutlinedInput-root': { borderRadius: 1.5, fontSize: 14 },
              }}
            />
          )}
        />
      </FormRow>
      <FormRow label={t('project.fields.allUser')}>
        <Controller
          name="isAllUserBelongTo"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              sx={{ ml: 0 }}
              control={
                <Checkbox
                  checked={!!field.value}
                  onChange={field.onChange}
                  size="small"
                  sx={{ p: 0, mr: 1 }}
                />
              }
              label={
                <CustomTypography sx={{ fontSize: 13, color: '#333' }}>
                  {t('project.fields.autoAddUser')}
                </CustomTypography>
              }
            />
          )}
        />
      </FormRow>
      <FormRow label={t('project.fields.projectType')}>
        <Controller
          name="projectType"
          control={control}
          render={({ field }) => (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, auto)',
                gap: 1,
                width: 'fit-content',
              }}
            >
              {PROJECT_TYPES.map((type) => (
                <CustomButton
                  key={type.value}
                  variant="outlined"
                  onClick={() => field.onChange(type.value)}
                  sx={{
                    borderRadius: 1.5,
                    fontWeight: 500,
                    fontSize: 13,
                    px: 6,
                    bgcolor:
                      field.value === type.value ? '#f97316' : 'transparent',
                    color: field.value === type.value ? '#fff' : '#555',
                    borderColor:
                      field.value === type.value ? '#f97316' : '#ddd',
                    '&:hover': {
                      bgcolor:
                        field.value === type.value ? '#ea6c00' : '#f5f5f5',
                      borderColor:
                        field.value === type.value ? '#ea6c00' : '#ccc',
                    },
                  }}
                >
                  {type.label}
                </CustomButton>
              ))}
            </Box>
          )}
        />
      </FormRow>
      <AddClientModal
        open={openCreateNewClient}
        onClose={() => setOpenCreateNewClient(false)}
      />
    </Box>
  );
}
