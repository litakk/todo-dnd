import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Select from "./select";
import Alldata from "../Alldata";
import { useState, useCallback, useEffect } from "react";

const drawerWidth = 440;

type SectionKey = "expirience" | "education" | "skills" | "about-me";

function getAllSectionData(): Record<SectionKey, any> {
  return {
    expirience: JSON.parse(localStorage.getItem("expirience") || "null"),
    education: JSON.parse(localStorage.getItem("education") || "null"),
    skills: JSON.parse(localStorage.getItem("skills") || "null"),
    "about-me": JSON.parse(localStorage.getItem("about-me") || "null"),
  };
}

function getOrderFromStorage(): SectionKey[] {
  const order = localStorage.getItem("resume-section-order");
  if (order) {
    try {
      const arr = JSON.parse(order);
      if (Array.isArray(arr) && arr.every((k) => typeof k === "string")) {
        return arr.filter((k) =>
          ["expirience", "education", "skills", "about-me"].includes(k)
        ) as SectionKey[];
      }
    } catch {}
  }
  return ["expirience", "education", "skills", "about-me"];
}

export default function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [order, setOrder] = useState<SectionKey[]>(getOrderFromStorage());
  const [data, setData] = useState<Record<SectionKey, any>>(
    getAllSectionData()
  );

  const reload = useCallback(() => setData(getAllSectionData()), []);

  useEffect(() => {
    const handler = () => reload();
    window.addEventListener("resume-data-updated", handler);
    return () => window.removeEventListener("resume-data-updated", handler);
  }, [reload]);

  useEffect(() => {
    localStorage.setItem("resume-section-order", JSON.stringify(order));
  }, [order]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <Select />
      </List>
      <Divider />
      <Alldata order={order} setOrder={setOrder} data={data} reload={reload} />
    </div>
  );

  const sectionTitles: Record<SectionKey, string> = {
    expirience: "Опыт работы",
    education: "Образование",
    skills: "Навыки",
    "about-me": "О себе",
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="resume sections"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-10 min-h-[600px] print:border-0 print:shadow-none print:p-0">
          <div className="border-b-2 border-blue-600 mb-10 pb-4">
            <div className="text-4xl font-bold tracking-wide text-blue-700">
              Иван Иванов
            </div>
            <div className="text-base text-gray-500 mt-2">
              Москва, example@mail.ru, +7 999 123-45-67
            </div>
          </div>
          {order.map((key) => {
            const sectionData = data[key];
            if (!sectionData) return null;

            return (
              <div key={key} className="mb-10">
                <div className="text-xl font-semibold text-blue-700 mb-3 border-l-4 border-blue-600 pl-3">
                  {sectionTitles[key]}
                </div>
                <div className="space-y-1 text-gray-800 text-base">
                  {key === "expirience" && (
                    <>
                      <div>
                        <span className="font-medium">Должность:</span>{" "}
                        {sectionData["должность"]}
                      </div>
                      <div>
                        <span className="font-medium">Компания:</span>{" "}
                        {sectionData["компания"]}
                      </div>
                      <div>
                        <span className="font-medium">Период:</span>{" "}
                        {sectionData["начало"]} — {sectionData["конец"]}
                      </div>
                    </>
                  )}
                  {key === "education" && (
                    <>
                      <div>
                        <span className="font-medium">Учебное заведение:</span>{" "}
                        {sectionData["учебное заведение"]}
                      </div>
                      <div>
                        <span className="font-medium">Специальность:</span>{" "}
                        {sectionData["специальность"]}
                      </div>
                      <div>
                        <span className="font-medium">Годы обучения:</span>{" "}
                        {sectionData["год начала"]} —{" "}
                        {sectionData["год окончания"]}
                      </div>
                    </>
                  )}
                  {key === "skills" && (
                    <>
                      <div>
                        <span className="font-medium">Навык:</span>{" "}
                        {sectionData["skill"]}
                      </div>
                      <div>
                        <span className="font-medium">Уровень:</span>{" "}
                        {sectionData["level"]}
                      </div>
                    </>
                  )}
                  {key === "about-me" && (
                    <>
                      <div>
                        <span className="font-medium">Описание:</span>{" "}
                        {sectionData["aboutPerson"]}
                      </div>
                      <div>
                        <span className="font-medium">Языки:</span>{" "}
                        {sectionData["language"]}
                      </div>
                      <div>
                        <span className="font-medium">Местоположение:</span>{" "}
                        {sectionData["location"]}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Box>
    </Box>
  );
}
