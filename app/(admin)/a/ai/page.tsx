'use client'

import { ResponsiveLine } from '@nivo/line'
import { ResponsiveBar } from '@nivo/bar'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

const Page = () => {
  return (
    <div className='flex flex-col gap-6 mt-[50px] mb-[100px]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>AI Model</CardTitle>
            <CardDescription>Select the AI model to use for your application.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select AI Model' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='gpt-3'>GPT-3</SelectItem>
                <SelectItem value='gpt-4'>GPT-4</SelectItem>
                <SelectItem value='davinci'>Davinci</SelectItem>
                <SelectItem value='curie'>Curie</SelectItem>
                <SelectItem value='babbage'>Babbage</SelectItem>
                <SelectItem value='ada'>Ada</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Provider</CardTitle>
            <CardDescription>Choose the provider for your AI services.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select AI Provider' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='openai'>OpenAI</SelectItem>
                <SelectItem value='anthropic'>Anthropic</SelectItem>
                <SelectItem value='cohere'>Cohere</SelectItem>
                <SelectItem value='hugging-face'>Hugging Face</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>API Token</CardTitle>
            <CardDescription>Enter your API token for the selected provider.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input type='text' placeholder='Enter API Token' />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
            <CardDescription>Configure any additional AI-related settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='temperature'>Temperature</Label>
                <Slider id='temperature' min={0} max={1} step={0.1} defaultValue={[0.5]} />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='max-tokens'>Max Tokens</Label>
                <Input id='max-tokens' type='number' defaultValue={1024} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Usage Metrics</CardTitle>
            <CardDescription>
              View charts and graphs showing your AI usage over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <Card>
                <CardHeader>
                  <CardTitle>Total Queries</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart className='aspect-[4/3]' />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Successful Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart className='aspect-[4/3]' />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Error Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart className='aspect-[4/3]' />
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: 'Jan', count: 111 },
          { name: 'Feb', count: 157 },
          { name: 'Mar', count: 129 },
          { name: 'Apr', count: 150 },
          { name: 'May', count: 119 },
          { name: 'Jun', count: 72 }
        ]}
        keys={['count']}
        indexBy='name'
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={['#020617']}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px'
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px'
            }
          },
          grid: {
            line: {
              stroke: '#f3f4f6'
            }
          }
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role='application'
        ariaLabel='A bar chart showing data'
      />
    </div>
  )
}

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: 'usage',
            data: [
              { x: 'Jan', y: 43 },
              { x: 'Feb', y: 137 },
              { x: 'Mar', y: 61 },
              { x: 'Apr', y: 145 },
              { x: 'May', y: 26 },
              { x: 'Jun', y: 154 }
            ]
          }
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: 'point'
        }}
        yScale={{
          type: 'linear'
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16
        }}
        colors={['#020617']}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: '9999px'
            },
            container: {
              fontSize: '12px',
              textTransform: 'capitalize',
              borderRadius: '6px'
            }
          },
          grid: {
            line: {
              stroke: '#f3f4f6'
            }
          }
        }}
        role='application'
      />
    </div>
  )
}

export default Page
