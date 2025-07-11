import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { login, signup } from "./actions"
import { CheckSquare } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <CheckSquare className="h-8 w-8 mr-2 text-primary" />
            <CardTitle className="text-2xl">TaskFlow</CardTitle>
          </div>
          <CardDescription>Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>

            <div className="flex space-x-2">
              <Button formAction={login} className="w-full">
                Log&nbsp;In
              </Button>
              <Button formAction={signup} variant="outline" className="w-full bg-transparent">
                Sign&nbsp;Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
