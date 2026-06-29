"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, FileCode, Play, Terminal, Database, GitBranch, AlertCircle, ChevronDown, ChevronRight, Eye } from "lucide-react";
import { GithubIcon as Github } from "./Icons";
import Link from "next/link";
import { useState } from "react";

// Project Data
const projects = [
  {
    id: "proj-1",
    title: "Python Selenium POM Framework",
    subtitle: "Enterprise UI Automation Suite",
    tags: ["Python", "Selenium", "Pytest", "Allure Reports", "Data-Driven"],
    description: "Robust UI regression suite built for logistics validation using Page Object Model, logging, screenshot capture on failure, and cookie/session injection.",
    challenge: "Consignment tracking UI had 40+ dynamic dropdowns and nested frames. Manual regression took 8 hours per release, with frequent element state anomalies.",
    approach: "Designed a BasePage wrapper around Selenium's explicit waits. Implemented custom decorators for automatic retry of stale elements and a data-driven layer feeding test scenarios via JSON configs.",
    outcome: "Reduced regression execution time to 18 minutes (parallelized). Capture-on-failure automated logging reduced bug isolation time by 70%.",
    codeSnippet: `class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 15)

    def click_element(self, locator):
        element = self.wait.until(EC.element_to_be_clickable(locator))
        element.click()

    def enter_text(self, locator, text):
        element = self.wait.until(EC.visibility_of_element_located(locator))
        element.clear()
        element.send_keys(text)`
  },
  {
    id: "proj-2",
    title: "Playwright Parallel Automation Framework",
    subtitle: "Modern Web Automation Engine",
    tags: ["Python", "Playwright", "Pytest", "HTML Reports", "Docker"],
    description: "Ultra-fast headless test automation utilizing Playwright's native auto-wait and isolated browser contexts, coupled with GitLab pipelines.",
    challenge: "Previous Selenium tests had 15% flakiness due to asynchronous React rendering and slow network request delays.",
    approach: "Leveraged Playwright's built-in auto-waiting and network interception to mock slow third-party inventory APIs. Configured parallel test runners utilizing multiple workers inside Docker.",
    outcome: "Flakiness rate dropped to < 1.5%. Parallel run times fell from 45 mins to 6 mins, running automatically on every GitLab merge request.",
    codeSnippet: `import pytest
from playwright.sync_api import Page, expect

def test_consignment_creation(page: Page):
    # Auto-waits for element loading natively
    page.goto("/consignment/create")
    page.fill("input[name='shipment_id']", "SHIP-9920")
    page.click("button:has-text('Dispatch')")
    
    # Asserting dynamic API response reflected on UI
    expect(page.locator(".status-badge")).to_have_text("DISPATCHED")`
  },
  {
    id: "proj-3",
    title: "Java Selenium TestNG Hybrid Framework",
    subtitle: "Legacy Enterprise Testing Suite",
    tags: ["Java", "Selenium", "TestNG", "Page Factory", "Extent Reports"],
    description: "Robust legacy automation testing framework integrating Page Factory, DataProvider, custom TestListeners, and automated email reports.",
    challenge: "Bulk dispatch testing required testing 120 unique data combinations across Chrome, Firefox, and Safari.",
    approach: "Built a hybrid framework using TestNG DataProvider to inject test records from Excel spreadsheets (Apache POI). Used ThreadLocal WebDrivers to support thread-safe parallel cross-browser execution.",
    outcome: "Supported full cross-browser test coverage. Achieved automated generation of Extent HTML dashboards distributed to stakeholders on execution complete.",
    codeSnippet: `@DataProvider(name = "consignmentData", parallel = true)
public Object[][] getConsignmentData() {
    return ExcelUtility.getTestData("Shipments");
}

@Test(dataProvider = "consignmentData")
public void testBulkDispatch(String id, String destination, String weight) {
    loginPage.login(username, password);
    dispatchPage.registerShipment(id, destination, weight);
    Assert.assertTrue(dispatchPage.isDispatchSuccessful());
}`
  },
  {
    id: "proj-4",
    title: "API Test Automation with Rest Assured",
    subtitle: "Backend Validation Pipeline",
    tags: ["Java", "Rest Assured", "TestNG", "Jackson", "JSON Schema"],
    description: "Comprehensive backend verification verifying logistics routing APIs, token authentications, and data validation rules.",
    challenge: "Ensuring real-time telemetry APIs for package dispatches correctly calculated shipping charges without database delays.",
    approach: "Designed a Rest Assured pipeline asserting status codes, headers, and parsing responses. Integrated JSON Schema validations to guarantee API contract compliance.",
    outcome: "100% of critical dispatch APIs validated in less than 2 minutes. Catches payload contract drifts before deployment to production.",
    codeSnippet: `given()
    .contentType(ContentType.JSON)
    .header("Authorization", "Bearer " + jwtToken)
    .body(shipmentPayload)
.when()
    .post("/api/v1/shipments/create")
.then()
    .statusCode(201)
    .body("status", equalTo("CREATED"))
    .body("tracking_number", notNullValue())
    .body(matchesJsonSchemaInClasspath("shipment-schema.json"));`
  },
  {
    id: "proj-5",
    title: "GitLab CI/CD Quality Pipeline",
    subtitle: "DevOps & Infrastructure Automation",
    tags: ["GitLab", "Docker", "Bash", "Linux", "Slack Notifications"],
    description: "Fully automated quality gate running UI and API suites on isolated Docker runners, outputting results directly to team channels.",
    challenge: "Code integrations frequently broke basic staging flows because regression runs were executed manually at end-of-day.",
    approach: "Engineered a `.gitlab-ci.yml` pipeline that triggers on code pushes. The pipeline builds a custom Python/Playwright image, mounts test results, and emails status alerts.",
    outcome: "Average bug lifespan in staging dropped from 16 hours to 10 minutes. Continuous sanity verification enabled true CI/CD deployment flow.",
    codeSnippet: `stages:
  - test

run_automation:
  stage: test
  image: python:3.10-slim
  before_script:
    - pip install -r requirements.txt
    - playwright install chromium --with-deps
  script:
    - pytest tests/ --html=report.html --self-contained-html
  artifacts:
    when: always
    paths:
      - report.html
    expire_in: 1 week`
  }
];

interface FileNode {
  name: string;
  type: string;
  content?: string;
  children?: FileNode[];
}

// POM File Tree Mock
const FILE_TREE: FileNode = {
  name: "automation_framework",
  type: "dir",
  children: [
    {
      name: "tests",
      type: "dir",
      children: [
        { name: "test_consignment.py", type: "file", content: `# tests/test_consignment.py\nimport pytest\nfrom pages.consignment_page import ConsignmentPage\n\ndef test_create_consignment(page):\n    consignment = ConsignmentPage(page)\n    consignment.navigate()\n    consignment.create_shipment("SHIP-8920", "Standard Air")\n    assert consignment.get_status() == "DISPATCHED"\n` },
        { name: "test_login.py", type: "file", content: `# tests/test_login.py\nimport pytest\nfrom pages.login_page import LoginPage\n\ndef test_valid_login(page):\n    login = LoginPage(page)\n    login.navigate()\n    login.login_user("sdet_lead", "secure_password")\n    assert login.is_dashboard_visible() == True\n` }
      ]
    },
    {
      name: "pages",
      type: "dir",
      children: [
        { name: "base_page.py", type: "file", content: `# pages/base_page.py\nclass BasePage:\n    def __init__(self, page):\n        self.page = page\n\n    def visit(self, url):\n        self.page.goto(url)\n\n    def click(self, selector):\n        self.page.click(selector)\n\n    def fill(self, selector, text):\n        self.page.fill(selector, text)\n` },
        { name: "consignment_page.py", type: "file", content: `# pages/consignment_page.py\nfrom pages.base_page import BasePage\n\nclass ConsignmentPage(BasePage):\n    def __init__(self, page):\n        super().__init__(page)\n        self.url = "/consignments"\n        self.id_input = "input#shipment-id"\n        self.type_select = "select#shipment-type"\n        self.submit_btn = "button#submit-dispatch"\n        self.status_label = ".shipment-status-value"\n\n    def navigate(self):\n        self.visit(self.url)\n\n    def create_shipment(self, ship_id, ship_type):\n        self.fill(self.id_input, ship_id)\n        self.fill(self.type_select, ship_type)\n        self.click(self.submit_btn)\n\n    def get_status(self):\n        return self.page.inner_text(self.status_label)\n` }
      ]
    },
    {
      name: "conftest.py",
      type: "file",
      content: `# conftest.py\nimport pytest\nfrom playwright.sync_api import sync_playwright\n\n@pytest.fixture(scope="session")\ndef browser():\n    with sync_playwright() as p:\n        browser = p.chromium.launch(headless=True)\n        yield browser\n        browser.close()\n\n@pytest.fixture(scope="function")\ndef page(browser):\n    context = browser.new_context(viewport={"width": 1280, "height": 720})\n    page = context.new_page()\n    yield page\n    context.close()\n`
    },
    {
      name: "pytest.ini",
      type: "file",
      content: `[pytest]\naddopts = --html=reports/automation_report.html --self-contained-html -v -n auto\ntestpaths = tests\npython_files = test_*.py\npython_functions = test_*\nmarkers =\n    smoke: Quick regression validation\n    regression: Full suite automation\n`
    },
    {
      name: "gitlab-ci.yml",
      type: "file",
      content: `stages:\n  - test\n\nrun_ui_tests:\n  stage: test\n  image: mcr.microsoft.com/playwright/python:v1.40.0-jammy\n  script:\n    - pip install -r requirements.txt\n    - pytest --html=report.html\n  artifacts:\n    when: always\n    paths:\n      - report.html\n`
    }
  ]
};

// PlayGround Scenarios
const PLAYGROUND_SCENARIOS = [
  {
    name: "Playwright UI Verification",
    command: "pytest tests/test_consignment.py --browser=chromium",
    logs: [
      "[14:02:11] initializing playwright web automation runner...",
      "[14:02:12] browser: chromium (headless mode)",
      "[14:02:13] navigating to: https://emist.logistics.com/consignments",
      "[14:02:14] inputting shipment ID 'SHIP-8920' to input#shipment-id",
      "[14:02:15] selecting shipment type 'Standard Air' from select#shipment-type",
      "[14:02:15] clicking button#submit-dispatch",
      "[14:02:16] awaiting backend api response...",
      "[14:02:17] network: POST /api/shipments returned 201 Created (220ms)",
      "[14:02:17] verifying label text inside .shipment-status-value...",
      "[14:02:18] assertion passed: status text equals 'DISPATCHED'",
      "[14:02:18] execution completed successfully. report.html written.",
      "RESULT: 1 Passed in 6.78s ✅"
    ]
  },
  {
    name: "REST Assured API Test",
    command: "mvn test -Dtest=TestGetConsignmentAPI",
    logs: [
      "[14:03:01] starting testng test runner...",
      "[14:03:02] base uri configured: https://api.iconsignment.com/v1",
      "[14:03:03] request payload: { id: 'EMIST-2026', type: 'express' }",
      "[14:03:03] request method: GET /api/v1/shipments/EMIST-2026",
      "[14:03:04] response status: 200 OK",
      "[14:03:04] validating response schema 'shipment-schema.json'...",
      "[14:03:05] assertion passed: schema matches perfectly.",
      "[14:03:05] assertion passed: body.status == 'DISPATCHED'",
      "[14:03:06] pipeline test execution successful.",
      "RESULT: TestGetConsignmentAPI Passed ✅"
    ]
  }
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<"showcase" | "explorer" | "playground">("showcase");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  // File tree state
  const [selectedFileContent, setSelectedFileContent] = useState<string>(
    FILE_TREE.children?.[0]?.children?.[0]?.content || ""
  );
  const [selectedFileName, setSelectedFileName] = useState<string>("test_consignment.py");
  const [openDirs, setOpenDirs] = useState<Record<string, boolean>>({
    "root": true,
    "tests": true,
    "pages": true
  });

  // Playground state
  const [playgroundLogs, setPlaygroundLogs] = useState<string[]>([]);
  const [isRunningPlayground, setIsRunningPlayground] = useState(false);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);

  const toggleDir = (dirName: string) => {
    setOpenDirs(prev => ({ ...prev, [dirName]: !prev[dirName] }));
  };

  const handleRunPlayground = () => {
    if (isRunningPlayground) return;
    setIsRunningPlayground(true);
    setPlaygroundLogs(["[system] launching isolated docker runner..."]);
    
    const logs = PLAYGROUND_SCENARIOS[selectedScenarioIndex].logs;
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < logs.length) {
        setPlaygroundLogs(prev => [...prev, logs[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsRunningPlayground(false);
      }
    }, 500);
  };

  return (
    <section id="projects" className="py-24 relative bg-black">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Portfolio</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Automation <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-500">Frameworks</span>
          </h3>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-4">
            Explore live frameworks, visual architecture trees, and play with the test runner sandbox.
          </p>
        </div>

        {/* Segmented Control Tabs */}
        <div className="flex justify-center mb-12">
          <div className="p-1 bg-zinc-950 border border-white/5 rounded-xl flex gap-1 text-xs">
            <button
              onClick={() => setActiveTab("showcase")}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "showcase" 
                  ? "bg-primary text-black" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="w-4 h-4" /> Case Studies
            </button>
            <button
              onClick={() => setActiveTab("explorer")}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "explorer" 
                  ? "bg-primary text-black" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <FolderOpen className="w-4 h-4" /> Framework POM Explorer
            </button>
            <button
              onClick={() => setActiveTab("playground")}
              className={`px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "playground" 
                  ? "bg-primary text-black" 
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Terminal className="w-4 h-4" /> Code Playground
            </button>
          </div>
        </div>

        {/* Tab 1: Case Studies Showcase */}
        {activeTab === "showcase" && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {projects.map((project, idx) => (
              <div 
                key={project.id}
                className="glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-primary/20"
              >
                {/* Header row */}
                <div 
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/2 hover:text-primary transition-colors select-none"
                >
                  <div className="space-y-1.5 text-left">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{project.title}</h4>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-primary border border-primary/20 px-2 py-0.5 rounded bg-primary/5">{project.subtitle}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[9px] text-zinc-500 font-medium bg-zinc-950 px-2 py-0.5 rounded border border-white/2">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-zinc-500">
                    {expandedProject === project.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </div>
                </div>

                {/* Expanded Case Study details */}
                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-white/5"
                    >
                      <div className="p-6 md:p-8 bg-[#060608]/90 grid md:grid-cols-2 gap-8 text-left text-xs leading-relaxed text-zinc-400">
                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-primary font-bold block mb-1">Overview</span>
                            <p className="text-zinc-300">{project.description}</p>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-red-400 font-bold block mb-1">Business Challenge</span>
                            <p>{project.challenge}</p>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-sky-400 font-bold block mb-1">Architectural Solution</span>
                            <p>{project.approach}</p>
                          </div>
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold block mb-1">Measurable Business Outcome</span>
                            <p className="text-zinc-200 font-medium">{project.outcome}</p>
                          </div>
                        </div>

                        {/* Code block preview */}
                        <div className="flex flex-col h-full justify-between">
                          <div className="flex-1 bg-zinc-950 p-4 rounded-xl border border-white/5 font-mono text-[9px] text-zinc-300 overflow-x-auto relative mb-4">
                            <span className="absolute top-2 right-3 text-[8px] uppercase tracking-wider text-zinc-600 font-bold">Framework Code</span>
                            <pre className="mt-2"><code>{project.codeSnippet}</code></pre>
                          </div>
                          <div className="flex gap-4">
                            <Link href="https://github.com" target="_blank" className="flex-1 py-2 border border-white/10 hover:border-primary/50 text-white rounded-lg flex items-center justify-center gap-2 font-semibold text-xs tracking-wider transition-colors">
                              <Github className="w-3.5 h-3.5" /> Repository
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Visual Framework Explorer */}
        {activeTab === "explorer" && (
          <div className="grid md:grid-cols-12 gap-6 max-w-5xl mx-auto items-stretch">
            
            {/* File Tree Left */}
            <div className="md:col-span-4 glass p-5 rounded-2xl border border-white/5 flex flex-col text-left text-xs font-mono select-none overflow-y-auto max-h-[450px]">
              <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-wider border-b border-white/5 pb-2 mb-3">
                <FolderOpen className="w-3.5 h-3.5 text-primary" /> Directory Tree
              </div>
              
              <div className="space-y-1">
                {/* Root Dir */}
                <div 
                  onClick={() => toggleDir("root")}
                  className="flex items-center gap-1.5 py-1 text-white hover:text-primary cursor-pointer"
                >
                  {openDirs["root"] ? <FolderOpen className="w-3.5 h-3.5 text-primary" /> : <Folder className="w-3.5 h-3.5 text-primary" />}
                  <span className="font-bold">automation_framework/</span>
                </div>

                {openDirs["root"] && (
                  <div className="pl-4 space-y-1">
                    {/* Tests folder */}
                    <div 
                      onClick={() => toggleDir("tests")}
                      className="flex items-center gap-1.5 py-1 text-zinc-300 hover:text-primary cursor-pointer"
                    >
                      {openDirs["tests"] ? <FolderOpen className="w-3.5 h-3.5 text-amber-500/80" /> : <Folder className="w-3.5 h-3.5 text-amber-500/80" />}
                      <span>tests/</span>
                    </div>

                    {openDirs["tests"] && (
                      <div className="pl-4">
                        {FILE_TREE.children?.[0]?.children?.map(file => (
                          <div
                            key={file.name}
                            onClick={() => {
                              setSelectedFileName(file.name);
                              setSelectedFileContent(file.content || "");
                            }}
                            className={`flex items-center gap-1.5 py-1 cursor-pointer transition-colors ${
                              selectedFileName === file.name ? "text-primary font-bold" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            <FileCode className="w-3.5 h-3.5" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pages folder */}
                    <div 
                      onClick={() => toggleDir("pages")}
                      className="flex items-center gap-1.5 py-1 text-zinc-300 hover:text-primary cursor-pointer"
                    >
                      {openDirs["pages"] ? <FolderOpen className="w-3.5 h-3.5 text-amber-500/80" /> : <Folder className="w-3.5 h-3.5 text-amber-500/80" />}
                      <span>pages/</span>
                    </div>

                    {openDirs["pages"] && (
                      <div className="pl-4">
                        {FILE_TREE.children?.[1]?.children?.map(file => (
                          <div
                            key={file.name}
                            onClick={() => {
                              setSelectedFileName(file.name);
                              setSelectedFileContent(file.content || "");
                            }}
                            className={`flex items-center gap-1.5 py-1 cursor-pointer transition-colors ${
                              selectedFileName === file.name ? "text-primary font-bold" : "text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            <FileCode className="w-3.5 h-3.5" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Root level files */}
                    {FILE_TREE.children?.slice(2).map(file => (
                      <div
                        key={file.name}
                        onClick={() => {
                          setSelectedFileName(file.name);
                          setSelectedFileContent(file.content || "");
                        }}
                        className={`flex items-center gap-1.5 py-1 cursor-pointer transition-colors ${
                          selectedFileName === file.name ? "text-primary font-bold" : "text-zinc-500 hover:text-zinc-300"
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5" />
                        <span>{file.name}</span>
                      </div>
                    ))}

                  </div>
                )}
              </div>
            </div>

            {/* Code Viewer Right */}
            <div className="md:col-span-8 glass rounded-2xl border border-white/5 flex flex-col overflow-hidden max-h-[450px]">
              <div className="h-10 bg-zinc-950 border-b border-white/5 px-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2"><FileCode className="w-4 h-4 text-primary" /> {selectedFileName}</span>
                <span className="text-[10px] uppercase font-bold text-zinc-600 select-none">READ ONLY CODE VIEWER</span>
              </div>
              <div className="flex-1 p-5 bg-[#030303] text-zinc-300 font-mono text-[10px] leading-relaxed text-left overflow-auto">
                <pre><code>{selectedFileContent}</code></pre>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Interactive Code Playground */}
        {activeTab === "playground" && (
          <div className="max-w-4xl mx-auto glass p-6 rounded-2xl border border-white/5 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-primary" /> Automation Sandbox Simulator
                </h4>
                <p className="text-zinc-500 text-xs">Execute functional test suites inside a simulated Docker container environment.</p>
              </div>

              {/* Scenario Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400 font-semibold">Select Suite:</span>
                <select
                  value={selectedScenarioIndex}
                  onChange={(e) => {
                    setSelectedScenarioIndex(Number(e.target.value));
                    setPlaygroundLogs([]);
                  }}
                  className="bg-zinc-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-primary"
                >
                  {PLAYGROUND_SCENARIOS.map((sc, idx) => (
                    <option key={idx} value={idx}>{sc.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Simulated Shell Terminal */}
            <div className="w-full bg-[#050507] rounded-xl border border-zinc-900 overflow-hidden flex flex-col font-mono text-xs aspect-[1.8] min-h-[300px]">
              {/* Top header bar */}
              <div className="h-8 bg-zinc-950 border-b border-zinc-900/60 px-4 flex items-center justify-between text-zinc-500 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <span className="ml-2">terminal - docker-container@qa-runner</span>
                </div>
                <span>bash</span>
              </div>

              {/* Console area */}
              <div className="flex-1 p-4 overflow-y-auto space-y-1 text-left text-zinc-400">
                <div className="text-zinc-500 flex items-center gap-1.5">
                  <span className="text-primary font-bold">root@qa-runner:~$</span> 
                  <span>{PLAYGROUND_SCENARIOS[selectedScenarioIndex].command}</span>
                </div>

                {playgroundLogs.map((log, idx) => (
                  <div key={idx} className={`${
                    log.includes("Passed ✅") || log.includes("passed")
                      ? "text-emerald-400 font-bold" 
                      : log.includes("Failed") || log.includes("Error")
                      ? "text-red-400 font-bold"
                      : log.includes("[assert]")
                      ? "text-sky-300"
                      : log.includes("[system]")
                      ? "text-zinc-500"
                      : "text-zinc-300"
                  }`}>
                    {log}
                  </div>
                ))}
              </div>

              {/* Console Action bottom bar */}
              <div className="h-10 bg-zinc-950 border-t border-zinc-900/60 px-4 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">Status: {isRunningPlayground ? "Executing automation script..." : "Runner Idle"}</span>
                <button
                  onClick={handleRunPlayground}
                  disabled={isRunningPlayground}
                  className={`px-4 py-1 rounded text-[10px] font-bold tracking-wider flex items-center gap-1.5 cursor-pointer ${
                    isRunningPlayground 
                      ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                      : "bg-primary text-black hover:bg-yellow-400"
                  }`}
                >
                  <Play className="w-3.5 h-3.5" /> RUN TEST RUNNER
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
