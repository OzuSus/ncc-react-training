import React, { useState } from 'react';
import {
  Box,
  Checkbox,
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
import FormRow from '@/pages/project/sections/CreateProject/Tab/TabGeneral/formRow.tsx';
import { ICreateProjectForm } from '@/pages/project/sections/CreateProject';
import { PROJECT_TYPES } from '@/libs/constants/projectType.ts';
import { errorMessages } from '@/libs/constants/errors.ts';
import AddClientModal from '@/libs/features/client/components/addClientModal.tsx';

export default function TabGeneral() {
  const [openCreateNewClient, setOpenCreateNewClient] = useState(false);
  const { data: clients = [] } = useClientQuery();
  const { control } = useFormContext<ICreateProjectForm>();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 1 }}>
      <FormRow label="Client" required>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
          <Controller
            name="customerId"
            control={control}
            rules={{ required: 'Project customer is required!' }}
            render={({ field, fieldState }) => {
              const selectedClient = clients.find((c) => c.id === field.value);
              return (
                <Autocomplete
                  value={selectedClient}
                  options={clients}
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
                      placeholder="Choose a client..."
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
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateNewClient(true)}
            sx={{
              bgcolor: '#4680ff',
              '&:hover': { bgcolor: '#3f78ff' },
              boxShadow: 'none',
              borderRadius: 1.5,
              height: 40,
            }}
          >
            New Client
          </CustomButton>
        </Box>
      </FormRow>

      <FormRow label="Project Name" required>
        <Controller
          name="name"
          control={control}
          rules={{ required: errorMessages.PROJECT.NAME }}
          render={({ field, fieldState }) => (
            <CustomTextField
              {...field}
              size="small"
              placeholder="Project name"
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
      <FormRow label="Project Code" required>
        <Controller
          name="code"
          control={control}
          rules={{ required: errorMessages.PROJECT.CODE }}
          render={({ field, fieldState }) => (
            <CustomTextField
              {...field}
              size="small"
              placeholder="Project code"
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
      <FormRow label="Date">
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
            to
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
      <FormRow label="Note">
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
      <FormRow label="All User">
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
                  Auto add user as a member of this project when creating new
                  user
                </CustomTypography>
              }
            />
          )}
        />
      </FormRow>
      <FormRow label="Project Type">
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
