import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import ModalExpirience from "../ModalExpirience";
import ModalEducation from "../ModalEducation";
import ModalSkills from "../ModalSkills";
import ModalAboutPerson from "../ModalAboutPerson";

export default function BasicSelect() {
  const [select, setSelect] = React.useState("");

  const [expModal, setExpModal] = React.useState(false);
  const [eduModal, setEduModal] = React.useState(false);
  const [skillsModal, setSkillsModal] = React.useState(false);
  const [aboutModal, setAboutModal] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ width: 220 }}>
        <FormControl fullWidth>
          <InputLabel id="section-select-label">Добавить секцию</InputLabel>
          <Select
            labelId="section-select-label"
            id="section-select"
            value={select}
            label="Добавить секцию"
            onChange={handleChange}
          >
            <MenuItem value="experience" onClick={() => setExpModal(true)}>
              Опыт
            </MenuItem>
            <MenuItem value="education" onClick={() => setEduModal(true)}>
              Образование
            </MenuItem>
            <MenuItem value="skills" onClick={() => setSkillsModal(true)}>
              Навыки
            </MenuItem>
            <MenuItem value="about" onClick={() => setAboutModal(true)}>
              О себе
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {expModal && (
        <ModalExpirience expModal={expModal} setExpModal={setExpModal} />
      )}

      {eduModal && (
        <ModalEducation eduModal={eduModal} setEduModal={setEduModal} />
      )}

      {skillsModal && (
        <ModalSkills
          skillsModal={skillsModal}
          setSkillsModal={setSkillsModal}
        />
      )}

      {aboutModal && (
        <ModalAboutPerson
          aboutModal={aboutModal}
          setAboutModal={setAboutModal}
        />
      )}
    </>
  );
}
