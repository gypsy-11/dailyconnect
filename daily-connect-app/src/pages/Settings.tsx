import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Settings as SettingsIcon, Users, Download, Upload, Trash2 } from 'lucide-react';

export function Settings() {
  const { data, addChild, removeChild, exportAllData, importAllData, clearAll } = useApp();
  const [newChildName, setNewChildName] = useState('');
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChildName.trim()) {
      addChild(newChildName.trim());
      setNewChildName('');
    }
  };

  const handleExport = () => {
    const dataStr = exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daily-connect-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        const success = importAllData(content);
        if (success) {
          alert('Data imported successfully!');
        } else {
          alert('Failed to import data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearAll = () => {
    if (showConfirmClear) {
      clearAll();
      setShowConfirmClear(false);
      alert('All data has been cleared.');
    } else {
      setShowConfirmClear(true);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <SettingsIcon className="w-12 h-12 text-lavender" />
        </div>
        <h1 className="text-4xl font-light text-charcoal">Settings</h1>
      </div>

      {/* Manage Children */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-lavender" />
            <h2 className="text-2xl font-semibold text-charcoal">Manage Children</h2>
          </div>

          {/* Add New Child */}
          <form onSubmit={handleAddChild} className="flex gap-3">
            <Input
              placeholder="Add child's name..."
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!newChildName.trim()}>
              Add
            </Button>
          </form>

          {/* Children List */}
          {data.children.length > 0 ? (
            <div className="space-y-3">
              {data.children.map(child => (
                <div
                  key={child.id}
                  className="flex items-center justify-between p-4 bg-lavender/5 rounded-2xl"
                >
                  <div>
                    <p className="font-medium text-charcoal">{child.name}</p>
                    <p className="text-sm text-charcoal-light">
                      Added {new Date(child.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Remove ${child.name}? This will also delete all their conversation history.`)) {
                        removeChild(child.id);
                      }
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-charcoal-light text-center py-4">
              No children added yet
            </p>
          )}
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-charcoal">Data Management</h2>

          {/* Export */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-charcoal-light" />
              <h3 className="font-medium text-charcoal">Export Data</h3>
            </div>
            <p className="text-sm text-charcoal-light">
              Download all your data as a JSON file for backup
            </p>
            <Button variant="secondary" onClick={handleExport}>
              Download Backup
            </Button>
          </div>

          {/* Import */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-charcoal-light" />
              <h3 className="font-medium text-charcoal">Import Data</h3>
            </div>
            <p className="text-sm text-charcoal-light">
              Restore data from a previously exported backup file
            </p>
            <div>
              <input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
              <label htmlFor="import-file">
                <Button variant="secondary" type="button" onClick={() => document.getElementById('import-file')?.click()}>
                  Choose File to Import
                </Button>
              </label>
            </div>
          </div>

          {/* Clear All */}
          <div className="space-y-3 pt-4 border-t border-charcoal/10">
            <div className="flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              <h3 className="font-medium text-charcoal">Clear All Data</h3>
            </div>
            <p className="text-sm text-charcoal-light">
              Permanently delete all children and conversation history
            </p>
            {showConfirmClear && (
              <p className="text-sm text-red-500 font-medium">
                ⚠️ Click again to confirm deletion
              </p>
            )}
            <Button
              variant="ghost"
              onClick={handleClearAll}
              className="text-red-500 hover:bg-red-50"
            >
              {showConfirmClear ? 'Confirm: Clear Everything' : 'Clear All Data'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <Card gradient>
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-charcoal">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-lavender">
                {data.children.length}
              </p>
              <p className="text-sm text-charcoal-light">
                {data.children.length === 1 ? 'Child' : 'Children'}
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-peach">
                {data.askedQuestions.length}
              </p>
              <p className="text-sm text-charcoal-light">Conversations</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

