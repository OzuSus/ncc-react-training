import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomTypography } from '@/libs/components/ui/Typography';
import { IProject } from '@/libs/features/project/types.ts';
import ProjectRow from '@/pages/project/sections/ProjectRow.tsx';

interface IGroup {
  clientId: string;
  clientName: string;
  items: IProject[];
}
interface IProjectGroupProps {
  group: IGroup;
  expanded: boolean;
  onToggle: () => void;
  onOpenActions: (
    event: { currentTarget: HTMLElement },
    projectId: number,
  ) => void;
}

export default function ProjectGroup({
  group,
  expanded,
  onToggle,
  onOpenActions,
}: IProjectGroupProps) {
  return (
    <Accordion
      elevation={0}
      expanded={expanded}
      onChange={onToggle}
      sx={{
        mb: 2,
        background: 'transparent',
        '&::before': {
          display: 'none',
        },
        '&.Mui-expanded': {
          margin: '0 0 16px 0',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<KeyboardArrowDownIcon />}
        sx={{
          background: '#e0e0e0',
          borderRadius: 2,
          px: 2,
          minHeight: '48px !important',
          height: 48,
          '&.Mui-expanded': {
            minHeight: '48px !important',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
          '& .MuiAccordionSummary-content': {
            margin: '0 !important',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '0 !important',
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            alignSelf: 'center',
          },
        }}
      >
        <CustomTypography sx={{ fontSize: 16, fontWeight: 600, color: '#222' }}>
          {group.clientName}
        </CustomTypography>
      </AccordionSummary>
      {expanded && (
        <AccordionDetails
          sx={{
            px: 0,
            py: 0,
            border: '1px solid #e0e0e0',
            borderTop: 'none',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            overflow: 'hidden',
          }}
        >
          {group.items.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onOpenActions={onOpenActions}
            />
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  );
}
