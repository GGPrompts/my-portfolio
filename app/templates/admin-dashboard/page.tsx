"use client"

import * as React from "react"
import {
  Activity,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Home,
  LogOut,
  Menu,
  Monitor,
  MoreHorizontal,
  Plus,
  Search,
  Server,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  Trash,
  User,
  Shield,
  Archive,
  Upload,
  RefreshCw,
  Filter,
  Calendar
} from "lucide-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data types
type User = {
  id: string
  name: string
  email: string
  role: "Admin" | "Editor" | "Viewer"
  status: "Active" | "Suspended" | "Pending"
  lastActive: string
  avatar: string
}

type Content = {
  id: string
  title: string
  type: "Post" | "Page" | "Media"
  status: "Published" | "Draft" | "Scheduled"
  author: string
  views: number
  engagement: number
  lastModified: string
}

type SystemMetric = {
  name: string
  value: number
  unit: string
  status: "healthy" | "warning" | "critical"
  icon: React.ReactNode
}

type Activity = {
  id: string
  user: string
  action: string
  timestamp: string
  type: "user" | "system" | "content"
}

// Mock data generation
const generateUsers = (): User[] => [
  { id: "1", name: "Alex Thompson", email: "alex@example.com", role: "Admin", status: "Active", lastActive: "2 min ago", avatar: "/api/placeholder/32/32" },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", role: "Editor", status: "Active", lastActive: "1 hour ago", avatar: "/api/placeholder/32/32" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "Viewer", status: "Suspended", lastActive: "3 days ago", avatar: "/api/placeholder/32/32" },
  { id: "4", name: "Emma Davis", email: "emma@example.com", role: "Editor", status: "Active", lastActive: "5 min ago", avatar: "/api/placeholder/32/32" },
  { id: "5", name: "John Smith", email: "john@example.com", role: "Viewer", status: "Pending", lastActive: "1 day ago", avatar: "/api/placeholder/32/32" },
]

const generateContent = (): Content[] => [
  { id: "1", title: "Getting Started with Next.js", type: "Post", status: "Published", author: "Alex Thompson", views: 1234, engagement: 89, lastModified: "2024-01-15" },
  { id: "2", title: "About Us", type: "Page", status: "Published", author: "Sarah Chen", views: 567, engagement: 45, lastModified: "2024-01-14" },
  { id: "3", title: "Advanced React Patterns", type: "Post", status: "Draft", author: "Emma Davis", views: 0, engagement: 0, lastModified: "2024-01-16" },
  { id: "4", title: "Contact", type: "Page", status: "Published", author: "Mike Johnson", views: 234, engagement: 12, lastModified: "2024-01-10" },
  { id: "5", title: "Building Scalable Apps", type: "Post", status: "Scheduled", author: "Alex Thompson", views: 0, engagement: 0, lastModified: "2024-01-17" },
]

const generateActivities = (): Activity[] => [
  { id: "1", user: "Alex Thompson", action: "created a new post", timestamp: "2 minutes ago", type: "content" },
  { id: "2", user: "System", action: "completed backup", timestamp: "15 minutes ago", type: "system" },
  { id: "3", user: "Sarah Chen", action: "updated user permissions", timestamp: "1 hour ago", type: "user" },
  { id: "4", user: "Emma Davis", action: "published an article", timestamp: "2 hours ago", type: "content" },
  { id: "5", user: "System", action: "detected unusual activity", timestamp: "3 hours ago", type: "system" },
]

// Chart data
const generateChartData = () => ({
  traffic: [
    { name: "Mon", visits: 4000, unique: 2400 },
    { name: "Tue", visits: 3000, unique: 1398 },
    { name: "Wed", visits: 2000, unique: 9800 },
    { name: "Thu", visits: 2780, unique: 3908 },
    { name: "Fri", visits: 1890, unique: 4800 },
    { name: "Sat", visits: 2390, unique: 3800 },
    { name: "Sun", visits: 3490, unique: 4300 },
  ],
  engagement: [
    { name: "Posts", value: 45, fill: "#10b981" },
    { name: "Pages", value: 30, fill: "#14b8a6" },
    { name: "Media", value: 25, fill: "#06b6d4" },
  ],
  performance: [
    { name: "00:00", cpu: 20, memory: 30, disk: 45 },
    { name: "04:00", cpu: 25, memory: 35, disk: 46 },
    { name: "08:00", cpu: 40, memory: 45, disk: 48 },
    { name: "12:00", cpu: 65, memory: 60, disk: 50 },
    { name: "16:00", cpu: 55, memory: 55, disk: 52 },
    { name: "20:00", cpu: 35, memory: 40, disk: 54 },
  ]
})

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("overview")
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")

  // Table states
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Mock data
  const users = generateUsers()
  const content = generateContent()
  const activities = generateActivities()
  const chartData = generateChartData()

  // System metrics
  const systemMetrics: SystemMetric[] = [
    { name: "CPU Usage", value: 45, unit: "%", status: "healthy", icon: <Zap className="h-4 w-4" /> },
    { name: "Memory", value: 62, unit: "%", status: "warning", icon: <Database className="h-4 w-4" /> },
    { name: "Storage", value: 78, unit: "%", status: "warning", icon: <Server className="h-4 w-4" /> },
    { name: "API Response", value: 120, unit: "ms", status: "healthy", icon: <Activity className="h-4 w-4" /> },
  ]

  // User table columns
  const userColumns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-cyan-600/30"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-cyan-600/30"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.avatar} />
            <AvatarFallback className="bg-cyan-900/20 text-cyan-400">
              {row.original.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-cyan-50">{row.original.name}</p>
            <p className="text-xs text-cyan-400/70">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role
        return (
          <Badge
            variant="outline"
            className={`
              ${role === 'Admin' ? 'border-red-500/30 text-red-400' : ''}
              ${role === 'Editor' ? 'border-yellow-500/30 text-yellow-400' : ''}
              ${role === 'Viewer' ? 'border-cyan-500/30 text-cyan-400' : ''}
            `}
          >
            <Shield className="mr-1 h-3 w-3" />
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge
            variant="outline"
            className={`
              ${status === 'Active' ? 'border-emerald-500/30 text-emerald-400' : ''}
              ${status === 'Suspended' ? 'border-red-500/30 text-red-400' : ''}
              ${status === 'Pending' ? 'border-yellow-500/30 text-yellow-400' : ''}
            `}
          >
            {status === 'Active' && <CheckCircle className="mr-1 h-3 w-3" />}
            {status === 'Suspended' && <AlertCircle className="mr-1 h-3 w-3" />}
            {status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "lastActive",
      header: "Last Active",
      cell: ({ row }) => (
        <span className="text-cyan-400/70 text-sm">{row.original.lastActive}</span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-dark border-cyan-600/20">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="hover:bg-cyan-900/20">
              <Edit className="mr-2 h-4 w-4" /> Edit User
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-cyan-900/20">
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-cyan-600/20" />
            <DropdownMenuItem className="hover:bg-red-900/20 text-red-400">
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const userTable = useReactTable({
    data: users,
    columns: userColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Navigation items
  const navigationItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "content", label: "Content", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-zinc-950">
        {/* Mobile Menu Button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 lg:hidden glass border-cyan-600/20"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 glass-dark border-r-cyan-600/20 p-0">
            <SidebarContent
              navigationItems={navigationItems}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              mobile
            />
          </SheetContent>
        </Sheet>

        <div className="flex h-screen">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={false}
            animate={{ width: sidebarOpen ? 280 : 80 }}
            className="hidden lg:block relative glass-dark border-r border-cyan-600/20"
          >
            <SidebarContent
              navigationItems={navigationItems}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              collapsed={!sidebarOpen}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute -right-4 top-20 glass border-cyan-600/20 rounded-full h-8 w-8"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeSection === "overview" && (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-cyan-50 terminal-glow">Dashboard Overview</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <StatCard
                        title="Total Users"
                        value="1,234"
                        change="+12.5%"
                        trend="up"
                        icon={<Users className="h-4 w-4" />}
                      />
                      <StatCard
                        title="Active Sessions"
                        value="342"
                        change="+5.2%"
                        trend="up"
                        icon={<Activity className="h-4 w-4" />}
                      />
                      <StatCard
                        title="Total Content"
                        value="856"
                        change="-2.4%"
                        trend="down"
                        icon={<FileText className="h-4 w-4" />}
                      />
                      <StatCard
                        title="System Health"
                        value="98.5%"
                        change="+0.8%"
                        trend="up"
                        icon={<Monitor className="h-4 w-4" />}
                      />
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="glass border-cyan-600/20 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-cyan-50">Traffic Overview</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <AreaChart data={chartData.traffic}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0f4a4a" />
                            <XAxis dataKey="name" stroke="#06b6d4" />
                            <YAxis stroke="#06b6d4" />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid #0891b2',
                                borderRadius: '8px'
                              }}
                            />
                            <Area type="monotone" dataKey="visits" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                            <Area type="monotone" dataKey="unique" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </Card>

                      <Card className="glass border-cyan-600/20 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-cyan-50">Content Distribution</h3>
                        <ResponsiveContainer width="100%" height={250}>
                          <PieChart>
                            <Pie
                              data={chartData.engagement}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {chartData.engagement.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Pie>
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid #0891b2',
                                borderRadius: '8px'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </Card>
                    </div>

                    {/* System Health */}
                    <Card className="glass border-cyan-600/20 p-6">
                      <h3 className="text-lg font-semibold mb-4 text-cyan-50">System Health</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {systemMetrics.map((metric) => (
                          <div key={metric.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-cyan-400/70 flex items-center gap-2">
                                {metric.icon}
                                {metric.name}
                              </span>
                              <span className={`text-sm font-semibold ${
                                metric.status === 'healthy' ? 'text-emerald-400' :
                                metric.status === 'warning' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>
                                {metric.value}{metric.unit}
                              </span>
                            </div>
                            <Progress
                              value={metric.unit === '%' ? metric.value : (metric.value / 200) * 100}
                              className="h-2 bg-cyan-900/20"
                            />
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Activity Feed */}
                    <Card className="glass border-cyan-600/20 p-6">
                      <h3 className="text-lg font-semibold mb-4 text-cyan-50">Recent Activity</h3>
                      <div className="space-y-3">
                        {activities.map((activity) => (
                          <ActivityItem key={activity.id} activity={activity} />
                        ))}
                      </div>
                    </Card>
                  </div>
                )}

                {activeSection === "users" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h1 className="text-3xl font-bold text-cyan-50 terminal-glow">User Management</h1>
                      <Button className="glass border-cyan-600/20 hover:bg-cyan-900/20">
                        <Plus className="mr-2 h-4 w-4" /> Add User
                      </Button>
                    </div>

                    {/* User Table */}
                    <Card className="glass border-cyan-600/20 p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400/50" />
                              <Input
                                placeholder="Search users..."
                                className="pl-10 glass-dark border-cyan-600/20 w-[300px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              />
                            </div>
                            <Select defaultValue="all">
                              <SelectTrigger className="w-[150px] glass-dark border-cyan-600/20">
                                <SelectValue placeholder="Filter by role" />
                              </SelectTrigger>
                              <SelectContent className="glass-dark border-cyan-600/20">
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="border-cyan-600/20">
                              <Download className="mr-2 h-4 w-4" /> Export
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="border-cyan-600/20">
                                  <Filter className="mr-2 h-4 w-4" /> Columns
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="glass-dark border-cyan-600/20">
                                {userTable.getAllColumns()
                                  .filter((column) => column.getCanHide())
                                  .map((column) => (
                                    <DropdownMenuCheckboxItem
                                      key={column.id}
                                      checked={column.getIsVisible()}
                                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                      {column.id}
                                    </DropdownMenuCheckboxItem>
                                  ))}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Selected Actions */}
                        {userTable.getFilteredSelectedRowModel().rows.length > 0 && (
                          <div className="flex items-center gap-2 p-2 glass border-cyan-600/20 rounded">
                            <span className="text-sm text-cyan-400">
                              {userTable.getFilteredSelectedRowModel().rows.length} selected
                            </span>
                            <Button size="sm" variant="ghost" className="hover:bg-cyan-900/20">
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-red-900/20 text-red-400">
                              <Trash className="mr-2 h-4 w-4" /> Delete
                            </Button>
                          </div>
                        )}

                        <div className="overflow-hidden rounded-lg border border-cyan-600/20">
                          <Table>
                            <TableHeader>
                              {userTable.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="border-cyan-600/20">
                                  {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-cyan-400">
                                      {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                          )}
                                    </TableHead>
                                  ))}
                                </TableRow>
                              ))}
                            </TableHeader>
                            <TableBody>
                              {userTable.getRowModel().rows?.length ? (
                                userTable.getRowModel().rows.map((row) => (
                                  <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-cyan-600/20 hover:bg-cyan-900/10"
                                  >
                                    {row.getVisibleCells().map((cell) => (
                                      <TableCell key={cell.id}>
                                        {flexRender(
                                          cell.column.columnDef.cell,
                                          cell.getContext()
                                        )}
                                      </TableCell>
                                    ))}
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell colSpan={userColumns.length} className="h-24 text-center">
                                    No results.
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-cyan-400/70">
                            {userTable.getFilteredSelectedRowModel().rows.length} of{" "}
                            {userTable.getFilteredRowModel().rows.length} row(s) selected.
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => userTable.previousPage()}
                              disabled={!userTable.getCanPreviousPage()}
                              className="border-cyan-600/20"
                            >
                              Previous
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => userTable.nextPage()}
                              disabled={!userTable.getCanNextPage()}
                              className="border-cyan-600/20"
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}

                {activeSection === "content" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h1 className="text-3xl font-bold text-cyan-50 terminal-glow">Content Management</h1>
                      <Button className="glass border-cyan-600/20 hover:bg-cyan-900/20">
                        <Plus className="mr-2 h-4 w-4" /> New Post
                      </Button>
                    </div>

                    <Tabs defaultValue="all" className="space-y-4">
                      <TabsList className="glass-dark border-cyan-600/20">
                        <TabsTrigger value="all">All Content</TabsTrigger>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="pages">Pages</TabsTrigger>
                        <TabsTrigger value="media">Media</TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="space-y-4">
                        {content.map((item) => (
                          <Card key={item.id} className="glass border-cyan-600/20 p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <h3 className="font-semibold text-cyan-50">{item.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-cyan-400/70">
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" /> {item.author}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> {item.lastModified}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" /> {item.views} views
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`
                                    ${item.status === 'Published' ? 'border-emerald-500/30 text-emerald-400' : ''}
                                    ${item.status === 'Draft' ? 'border-yellow-500/30 text-yellow-400' : ''}
                                    ${item.status === 'Scheduled' ? 'border-cyan-500/30 text-cyan-400' : ''}
                                  `}
                                >
                                  {item.status}
                                </Badge>
                                <Button size="sm" variant="ghost" className="hover:bg-cyan-900/20">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="hover:bg-red-900/20">
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </TabsContent>
                    </Tabs>
                  </div>
                )}

                {activeSection === "analytics" && (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-cyan-50 terminal-glow">Analytics</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="glass border-cyan-600/20 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-cyan-50">Performance Metrics</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={chartData.performance}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0f4a4a" />
                            <XAxis dataKey="name" stroke="#06b6d4" />
                            <YAxis stroke="#06b6d4" />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid #0891b2',
                                borderRadius: '8px'
                              }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="cpu" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
                            <Line type="monotone" dataKey="memory" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
                            <Line type="monotone" dataKey="disk" stroke="#14b8a6" strokeWidth={2} dot={{ fill: '#14b8a6' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </Card>

                      <Card className="glass border-cyan-600/20 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-cyan-50">User Growth</h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={chartData.traffic}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#0f4a4a" />
                            <XAxis dataKey="name" stroke="#06b6d4" />
                            <YAxis stroke="#06b6d4" />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                border: '1px solid #0891b2',
                                borderRadius: '8px'
                              }}
                            />
                            <Bar dataKey="visits" fill="#10b981" />
                            <Bar dataKey="unique" fill="#06b6d4" />
                          </BarChart>
                        </ResponsiveContainer>
                      </Card>
                    </div>
                  </div>
                )}

                {activeSection === "settings" && (
                  <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-cyan-50 terminal-glow">System Settings</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="glass border-cyan-600/20 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-cyan-50">General Settings</h3>
                        <div className="space-y-4">
                          <SettingItem
                            label="Enable Notifications"
                            description="Receive system alerts and updates"
                            defaultChecked={true}
                          />
                          <SettingItem
                            label="Auto Backup"
                            description="Automatically backup data every 24 hours"
                            defaultChecked={true}
                          />
                          <SettingItem
                            label="Maintenance Mode"
                            description="Temporarily disable public access"
                            defaultChecked={false}
                          />
                          <SettingItem
                            label="Debug Mode"
                            description="Enable detailed logging for troubleshooting"
                            defaultChecked={false}
                          />
                        </div>
                      </Card>

                      <Card className="glass border-cyan-600/20 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-cyan-50">Security Settings</h3>
                        <div className="space-y-4">
                          <SettingItem
                            label="Two-Factor Authentication"
                            description="Require 2FA for all admin accounts"
                            defaultChecked={true}
                          />
                          <SettingItem
                            label="Session Timeout"
                            description="Auto logout after 30 minutes of inactivity"
                            defaultChecked={true}
                          />
                          <SettingItem
                            label="IP Whitelist"
                            description="Restrict access to specific IP addresses"
                            defaultChecked={false}
                          />
                          <SettingItem
                            label="SSL Enforcement"
                            description="Force HTTPS for all connections"
                            defaultChecked={true}
                          />
                        </div>
                      </Card>

                      <Card className="glass border-cyan-600/20 p-6 lg:col-span-2">
                        <h3 className="text-lg font-semibold mb-4 text-cyan-50">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Button className="glass border-cyan-600/20 hover:bg-cyan-900/20 flex flex-col items-center gap-2 h-auto py-4">
                            <Archive className="h-5 w-5" />
                            <span className="text-xs">Backup Now</span>
                          </Button>
                          <Button className="glass border-cyan-600/20 hover:bg-cyan-900/20 flex flex-col items-center gap-2 h-auto py-4">
                            <RefreshCw className="h-5 w-5" />
                            <span className="text-xs">Clear Cache</span>
                          </Button>
                          <Button className="glass border-cyan-600/20 hover:bg-cyan-900/20 flex flex-col items-center gap-2 h-auto py-4">
                            <Upload className="h-5 w-5" />
                            <span className="text-xs">Import Data</span>
                          </Button>
                          <Button className="glass border-cyan-600/20 hover:bg-cyan-900/20 flex flex-col items-center gap-2 h-auto py-4">
                            <Download className="h-5 w-5" />
                            <span className="text-xs">Export Data</span>
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}

// Sub-components
function SidebarContent({
  navigationItems,
  activeSection,
  setActiveSection,
  collapsed = false,
  mobile = false
}: {
  navigationItems: Array<{ id: string; label: string; icon: any }>
  activeSection: string
  setActiveSection: (section: string) => void
  collapsed?: boolean
  mobile?: boolean
}) {
  return (
    <div className="flex flex-col h-full">
      {/* User Profile */}
      <div className={`p-4 border-b border-cyan-600/20 ${collapsed && !mobile ? 'px-3' : ''}`}>
        <div className={`flex items-center gap-3 ${collapsed && !mobile ? 'justify-center' : ''}`}>
          <Avatar>
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-cyan-900/20 text-cyan-400">AD</AvatarFallback>
          </Avatar>
          {(!collapsed || mobile) && (
            <div>
              <p className="font-semibold text-cyan-50">Admin User</p>
              <p className="text-xs text-cyan-400/70">admin@example.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      {(!collapsed || mobile) && (
        <div className="p-4 border-b border-cyan-600/20">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="glass border-cyan-600/20 rounded p-2">
              <p className="text-xl font-bold text-cyan-400">234</p>
              <p className="text-xs text-cyan-400/70">Active</p>
            </div>
            <div className="glass border-cyan-600/20 rounded p-2">
              <p className="text-xl font-bold text-emerald-400">98.5%</p>
              <p className="text-xs text-cyan-400/70">Uptime</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                        ${collapsed && !mobile ? 'justify-center' : ''}
                        ${activeSection === item.id
                          ? 'glass border-cyan-600/20 text-cyan-400'
                          : 'hover:bg-cyan-900/20 text-cyan-400/70 hover:text-cyan-400'
                        }
                      `}
                    >
                      <Icon className="h-5 w-5" />
                      {(!collapsed || mobile) && <span>{item.label}</span>}
                    </button>
                  </TooltipTrigger>
                  {collapsed && !mobile && (
                    <TooltipContent side="right">
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className={`p-4 border-t border-cyan-600/20 ${collapsed && !mobile ? 'px-3' : ''}`}>
        <Button
          variant="ghost"
          className={`w-full hover:bg-red-900/20 hover:text-red-400 ${collapsed && !mobile ? 'justify-center' : 'justify-start'}`}
        >
          <LogOut className="h-5 w-5" />
          {(!collapsed || mobile) && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  trend,
  icon
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}) {
  return (
    <Card className="glass border-cyan-600/20 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-cyan-400/70 text-sm">{title}</span>
        <span className="text-cyan-400/50">{icon}</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold text-cyan-50">{value}</span>
        <span className={`text-sm flex items-center gap-1 ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </span>
      </div>
    </Card>
  )
}

function ActivityItem({ activity }: { activity: Activity }) {
  const getActivityIcon = () => {
    switch (activity.type) {
      case 'user': return <User className="h-4 w-4 text-cyan-400" />
      case 'system': return <Monitor className="h-4 w-4 text-yellow-400" />
      case 'content': return <FileText className="h-4 w-4 text-emerald-400" />
      default: return null
    }
  }

  return (
    <div className="flex items-start gap-3 p-2 rounded hover:bg-cyan-900/10 transition-colors">
      <div className="mt-1">{getActivityIcon()}</div>
      <div className="flex-1 space-y-1">
        <p className="text-sm text-cyan-50">
          <span className="font-medium">{activity.user}</span>
          <span className="text-cyan-400/70"> {activity.action}</span>
        </p>
        <p className="text-xs text-cyan-400/50">{activity.timestamp}</p>
      </div>
    </div>
  )
}

function SettingItem({
  label,
  description,
  defaultChecked
}: {
  label: string
  description: string
  defaultChecked: boolean
}) {
  return (
    <div className="flex items-center justify-between p-3 glass border-cyan-600/20 rounded-lg">
      <div className="space-y-1">
        <Label htmlFor={label} className="text-cyan-50 cursor-pointer">
          {label}
        </Label>
        <p className="text-xs text-cyan-400/70">{description}</p>
      </div>
      <Switch
        id={label}
        defaultChecked={defaultChecked}
        className="data-[state=checked]:bg-cyan-600"
      />
    </div>
  )
}